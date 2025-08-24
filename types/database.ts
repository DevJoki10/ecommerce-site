export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          role: 'buyer' | 'seller' | 'admin'
          seller_status: 'pending' | 'approved' | 'suspended' | 'rejected'
          business_name: string | null
          business_address: string | null
          tax_id: string | null
          bank_account_details: Json | null
          preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'buyer' | 'seller' | 'admin'
          seller_status?: 'pending' | 'approved' | 'suspended' | 'rejected'
          business_name?: string | null
          business_address?: string | null
          tax_id?: string | null
          bank_account_details?: Json | null
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'buyer' | 'seller' | 'admin'
          seller_status?: 'pending' | 'approved' | 'suspended' | 'rejected'
          business_name?: string | null
          business_address?: string | null
          tax_id?: string | null
          bank_account_details?: Json | null
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          parent_id: string | null
          sort_order: number
          is_active: boolean
          seo_title: string | null
          seo_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          seo_title?: string | null
          seo_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          seo_title?: string | null
          seo_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          seller_id: string | null
          category_id: string | null
          name: string
          slug: string
          description: string | null
          short_description: string | null
          sku: string | null
          price: number
          compare_price: number | null
          cost_price: number | null
          track_inventory: boolean
          inventory_quantity: number
          low_stock_threshold: number
          weight: number | null
          dimensions: Json | null
          images: string[]
          specifications: Json
          key_features: string[]
          applications: string[]
          usage_instructions: string[]
          safety_cautions: string[]
          status: 'draft' | 'active' | 'inactive' | 'out_of_stock'
          is_featured: boolean
          seo_title: string | null
          seo_description: string | null
          tags: string[]
          rating_average: number
          rating_count: number
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id?: string | null
          category_id?: string | null
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          sku?: string | null
          price: number
          compare_price?: number | null
          cost_price?: number | null
          track_inventory?: boolean
          inventory_quantity?: number
          low_stock_threshold?: number
          weight?: number | null
          dimensions?: Json | null
          images?: string[]
          specifications?: Json
          key_features?: string[]
          applications?: string[]
          usage_instructions?: string[]
          safety_cautions?: string[]
          status?: 'draft' | 'active' | 'inactive' | 'out_of_stock'
          is_featured?: boolean
          seo_title?: string | null
          seo_description?: string | null
          tags?: string[]
          rating_average?: number
          rating_count?: number
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          seller_id?: string | null
          category_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          sku?: string | null
          price?: number
          compare_price?: number | null
          cost_price?: number | null
          track_inventory?: boolean
          inventory_quantity?: number
          low_stock_threshold?: number
          weight?: number | null
          dimensions?: Json | null
          images?: string[]
          specifications?: Json
          key_features?: string[]
          applications?: string[]
          usage_instructions?: string[]
          safety_cautions?: string[]
          status?: 'draft' | 'active' | 'inactive' | 'out_of_stock'
          is_featured?: boolean
          seo_title?: string | null
          seo_description?: string | null
          tags?: string[]
          rating_average?: number
          rating_count?: number
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string | null
          product_id: string | null
          variant_id: string | null
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          variant_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          variant_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
          subtotal: number
          tax_amount: number
          shipping_amount: number
          discount_amount: number
          total_amount: number
          currency: string
          customer_email: string
          customer_phone: string | null
          billing_address: Json
          shipping_address: Json
          shipping_method: string | null
          tracking_number: string | null
          payment_method: string | null
          payment_intent_id: string | null
          stripe_session_id: string | null
          notes: string | null
          admin_notes: string | null
          shipped_at: string | null
          delivered_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          user_id?: string | null
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          subtotal: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount: number
          currency?: string
          customer_email: string
          customer_phone?: string | null
          billing_address: Json
          shipping_address: Json
          shipping_method?: string | null
          tracking_number?: string | null
          payment_method?: string | null
          payment_intent_id?: string | null
          stripe_session_id?: string | null
          notes?: string | null
          admin_notes?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string | null
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount?: number
          currency?: string
          customer_email?: string
          customer_phone?: string | null
          billing_address?: Json
          shipping_address?: Json
          shipping_method?: string | null
          tracking_number?: string | null
          payment_method?: string | null
          payment_intent_id?: string | null
          stripe_session_id?: string | null
          notes?: string | null
          admin_notes?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          product_id: string | null
          variant_id: string | null
          seller_id: string | null
          product_name: string
          product_sku: string | null
          quantity: number
          unit_price: number
          total_price: number
          commission_rate: number
          commission_amount: number | null
          seller_earnings: number | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          variant_id?: string | null
          seller_id?: string | null
          product_name: string
          product_sku?: string | null
          quantity: number
          unit_price: number
          total_price: number
          commission_rate?: number
          commission_amount?: number | null
          seller_earnings?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          variant_id?: string | null
          seller_id?: string | null
          product_name?: string
          product_sku?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
          commission_rate?: number
          commission_amount?: number | null
          seller_earnings?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'buyer' | 'seller' | 'admin'
      seller_status: 'pending' | 'approved' | 'suspended' | 'rejected'
      order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      product_status: 'draft' | 'active' | 'inactive' | 'out_of_stock'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}