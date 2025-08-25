/*
  # Setup Authentication System

  1. Authentication Tables
    - User profiles with roles and authentication
    - Session management
    - Password reset tokens
    
  2. Security
    - Enable RLS on all tables
    - Add authentication policies
    - Secure user data access
    
  3. Functions
    - User registration
    - Profile creation
    - Authentication helpers
*/

-- Create authentication helper functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'buyer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create user sessions table for better session management
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  session_token text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  token text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user sessions
CREATE POLICY "Users can view own sessions" ON user_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON user_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for password reset tokens
CREATE POLICY "Users can view own reset tokens" ON password_reset_tokens
  FOR SELECT USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);

-- Update profiles table policies for better authentication
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles viewable by all" ON profiles;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public seller profiles viewable" ON profiles
  FOR SELECT USING (role = 'seller' AND seller_status = 'approved');

-- Function to get user profile with authentication check
CREATE OR REPLACE FUNCTION get_user_profile(user_uuid uuid)
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  phone text,
  avatar_url text,
  role user_role,
  seller_status seller_status,
  business_name text,
  created_at timestamptz
) 
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the requesting user is the profile owner or admin
  IF auth.uid() = user_uuid OR 
     (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin' THEN
    
    RETURN QUERY
    SELECT 
      p.id,
      p.email,
      p.full_name,
      p.phone,
      p.avatar_url,
      p.role,
      p.seller_status,
      p.business_name,
      p.created_at
    FROM profiles p
    WHERE p.id = user_uuid;
  ELSE
    RAISE EXCEPTION 'Access denied';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to update user profile
CREATE OR REPLACE FUNCTION update_user_profile(
  user_uuid uuid,
  new_full_name text DEFAULT NULL,
  new_phone text DEFAULT NULL,
  new_avatar_url text DEFAULT NULL,
  new_business_name text DEFAULT NULL
)
RETURNS profiles
SECURITY DEFINER
AS $$
DECLARE
  updated_profile profiles;
BEGIN
  -- Check if the requesting user is the profile owner
  IF auth.uid() != user_uuid THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  
  UPDATE profiles SET
    full_name = COALESCE(new_full_name, full_name),
    phone = COALESCE(new_phone, phone),
    avatar_url = COALESCE(new_avatar_url, avatar_url),
    business_name = COALESCE(new_business_name, business_name),
    updated_at = now()
  WHERE id = user_uuid
  RETURNING * INTO updated_profile;
  
  RETURN updated_profile;
END;
$$ LANGUAGE plpgsql;

-- Function to create password reset token
CREATE OR REPLACE FUNCTION create_password_reset_token(user_email text)
RETURNS text
SECURITY DEFINER
AS $$
DECLARE
  user_id uuid;
  reset_token text;
BEGIN
  -- Find user by email
  SELECT id INTO user_id FROM profiles WHERE email = user_email;
  
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;
  
  -- Generate reset token
  reset_token := encode(gen_random_bytes(32), 'hex');
  
  -- Insert reset token
  INSERT INTO password_reset_tokens (user_id, token, expires_at)
  VALUES (user_id, reset_token, now() + interval '1 hour');
  
  RETURN reset_token;
END;
$$ LANGUAGE plpgsql;

-- Function to verify and use password reset token
CREATE OR REPLACE FUNCTION verify_password_reset_token(reset_token text)
RETURNS uuid
SECURITY DEFINER
AS $$
DECLARE
  token_record password_reset_tokens;
  user_uuid uuid;
BEGIN
  -- Find valid token
  SELECT * INTO token_record 
  FROM password_reset_tokens 
  WHERE token = reset_token 
    AND expires_at > now() 
    AND used = false;
  
  IF token_record IS NULL THEN
    RAISE EXCEPTION 'Invalid or expired token';
  END IF;
  
  -- Mark token as used
  UPDATE password_reset_tokens 
  SET used = true 
  WHERE id = token_record.id;
  
  RETURN token_record.user_id;
END;
$$ LANGUAGE plpgsql;