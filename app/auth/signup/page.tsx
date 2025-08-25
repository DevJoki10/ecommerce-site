import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#6db33f' }}>
            KJ Electronics
          </h1>
          <p className="text-gray-600 mt-2">Nigeria's No. 1 Electronics Store</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}