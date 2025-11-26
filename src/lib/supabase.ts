import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          price: number;
          compare_at_price: number | null;
          category_id: string | null;
          image_url: string | null;
          images: any;
          stock: number;
          brand: string;
          rating: number;
          review_count: number;
          tags: string[];
          specifications: any;
          is_featured: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          image_url: string | null;
          parent_id: string | null;
          created_at: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          rating: number;
          title: string;
          comment: string;
          is_verified_purchase: boolean;
          helpful_count: number;
          created_at: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          order_number: string;
          status: string;
          subtotal: number;
          tax: number;
          shipping: number;
          total: number;
          shipping_address: any;
          payment_method: string;
          payment_status: string;
          stripe_payment_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
