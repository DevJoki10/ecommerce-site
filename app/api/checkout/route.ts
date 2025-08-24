import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Stripe from 'stripe'
import { cart } from '@/lib/cart'
import { orders } from '@/lib/orders'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const {
      customer_email,
      customer_phone,
      billing_address,
      shipping_address,
      shipping_method,
      payment_method = 'stripe',
      notes
    } = await request.json()

    // Get cart items
    const cartSummary = await cart.getCartSummary(user?.id || '')
    
    if (cartSummary.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Calculate shipping
    let shippingAmount = 0
    if (cartSummary.subtotal < 50000) {
      // Calculate based on shipping zone and distance
      shippingAmount = 2500 // Default shipping
    }

    const taxAmount = cartSummary.subtotal * 0.075 // 7.5% VAT
    const totalAmount = cartSummary.subtotal + taxAmount + shippingAmount

    // Create order items
    const orderItems = cartSummary.items.map(item => ({
      product_id: item.product_id!,
      variant_id: item.variant_id,
      seller_id: item.product?.seller_id || '',
      product_name: item.product?.name || '',
      product_sku: item.product?.sku || '',
      quantity: item.quantity,
      unit_price: item.product?.price || 0
    }))

    // Create order
    const order = await orders.createOrder({
      user_id: user?.id,
      customer_email,
      customer_phone,
      billing_address,
      shipping_address,
      items: orderItems,
      subtotal: cartSummary.subtotal,
      tax_amount: taxAmount,
      shipping_amount: shippingAmount,
      total_amount: totalAmount,
      payment_method,
      shipping_method,
      notes
    })

    if (payment_method === 'stripe') {
      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cartSummary.items.map(item => ({
          price_data: {
            currency: 'ngn',
            product_data: {
              name: item.product?.name || 'Product',
              description: item.product?.short_description || undefined,
              images: item.product?.images?.slice(0, 1) || []
            },
            unit_amount: Math.round((item.product?.price || 0) * 100) // Convert to kobo
          },
          quantity: item.quantity
        })),
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
        customer_email,
        metadata: {
          order_id: order.id,
          user_id: user?.id || ''
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: Math.round(shippingAmount * 100),
                currency: 'ngn'
              },
              display_name: shipping_method || 'Standard Shipping'
            }
          }
        ]
      })

      // Update order with Stripe session ID
      await supabase
        .from('orders')
        .update({ stripe_session_id: session.id })
        .eq('id', order.id)

      return NextResponse.json({ 
        sessionId: session.id,
        orderId: order.id,
        checkoutUrl: session.url
      })
    }

    // For other payment methods, return order details
    return NextResponse.json({ 
      orderId: order.id,
      totalAmount,
      order
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    )
  }
}