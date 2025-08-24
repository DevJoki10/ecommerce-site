import { supabase } from './supabase'
import { Database } from '@/types/database'

type CartItem = Database['public']['Tables']['cart_items']['Row']
type Product = Database['public']['Tables']['products']['Row']

export interface CartItemWithProduct extends CartItem {
  product: Product | null
}

export const cart = {
  // Add item to cart
  async addItem(userId: string, productId: string, quantity = 1, variantId?: string) {
    // Check if item already exists
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .single()

    if (existingItem) {
      // Update quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single()

      if (error) throw error
      return data
    } else {
      // Add new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          variant_id: variantId || null,
          quantity
        })
        .select()
        .single()

      if (error) throw error
      return data
    }
  },

  // Update item quantity
  async updateQuantity(userId: string, itemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeItem(userId, itemId)
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Remove item from cart
  async removeItem(userId: string, itemId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)
      .eq('user_id', userId)

    if (error) throw error
  },

  // Get cart items
  async getItems(userId: string): Promise<CartItemWithProduct[]> {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as CartItemWithProduct[]
  },

  // Clear cart
  async clearCart(userId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)

    if (error) throw error
  },

  // Get cart summary
  async getCartSummary(userId: string) {
    const items = await this.getItems(userId)
    
    const subtotal = items.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity
    }, 0)

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return {
      items,
      itemCount,
      subtotal,
      tax: subtotal * 0.075, // 7.5% VAT
      shipping: subtotal > 50000 ? 0 : 2500, // Free shipping over ₦50,000
      total: subtotal + (subtotal * 0.075) + (subtotal > 50000 ? 0 : 2500)
    }
  }
}