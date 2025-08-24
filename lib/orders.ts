import { supabase } from './supabase'
import { Database } from '@/types/database'

type Order = Database['public']['Tables']['orders']['Row']
type OrderItem = Database['public']['Tables']['order_items']['Row']

export interface OrderWithItems extends Order {
  order_items: OrderItem[]
}

export const orders = {
  // Create order
  async createOrder(orderData: {
    user_id?: string
    customer_email: string
    customer_phone?: string
    billing_address: any
    shipping_address: any
    items: Array<{
      product_id: string
      variant_id?: string
      seller_id: string
      product_name: string
      product_sku?: string
      quantity: number
      unit_price: number
    }>
    subtotal: number
    tax_amount?: number
    shipping_amount?: number
    discount_amount?: number
    total_amount: number
    payment_method?: string
    shipping_method?: string
    notes?: string
  }) {
    // Generate order number
    const orderNumber = `KJ${Date.now()}`

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: orderData.user_id || null,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone || null,
        billing_address: orderData.billing_address,
        shipping_address: orderData.shipping_address,
        subtotal: orderData.subtotal,
        tax_amount: orderData.tax_amount || 0,
        shipping_amount: orderData.shipping_amount || 0,
        discount_amount: orderData.discount_amount || 0,
        total_amount: orderData.total_amount,
        payment_method: orderData.payment_method || null,
        shipping_method: orderData.shipping_method || null,
        notes: orderData.notes || null
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id || null,
      seller_id: item.seller_id,
      product_name: item.product_name,
      product_sku: item.product_sku || null,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity,
      commission_rate: 10.0, // 10% commission
      commission_amount: (item.unit_price * item.quantity) * 0.1,
      seller_earnings: (item.unit_price * item.quantity) * 0.9
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    // Create seller earnings records
    const earningsData = orderItems.map(item => ({
      seller_id: item.seller_id,
      order_id: order.id,
      order_item_id: item.order_id, // This will be updated after items are created
      gross_amount: item.total_price,
      commission_amount: item.commission_amount!,
      net_amount: item.seller_earnings!,
      status: 'pending'
    }))

    const { error: earningsError } = await supabase
      .from('seller_earnings')
      .insert(earningsData)

    if (earningsError) throw earningsError

    return order
  },

  // Get order by ID
  async getOrderById(orderId: string): Promise<OrderWithItems | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('id', orderId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data as OrderWithItems
  },

  // Get orders by user
  async getOrdersByUser(userId: string, limit = 20): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as OrderWithItems[]
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status'], adminNotes?: string) {
    const updateData: any = { status }
    
    if (status === 'shipped') {
      updateData.shipped_at = new Date().toISOString()
    } else if (status === 'delivered') {
      updateData.delivered_at = new Date().toISOString()
    }

    if (adminNotes) {
      updateData.admin_notes = adminNotes
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update payment status
  async updatePaymentStatus(orderId: string, paymentStatus: Order['payment_status'], paymentIntentId?: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({
        payment_status: paymentStatus,
        payment_intent_id: paymentIntentId || null
      })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get seller orders
  async getSellerOrders(sellerId: string, limit = 20): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items!inner(*)
      `)
      .eq('order_items.seller_id', sellerId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as OrderWithItems[]
  }
}