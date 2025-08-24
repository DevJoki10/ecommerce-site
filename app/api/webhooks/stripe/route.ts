import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { cart } from '@/lib/cart'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = session.metadata?.order_id
        const userId = session.metadata?.user_id

        if (orderId) {
          // Update order payment status
          await supabaseAdmin
            .from('orders')
            .update({
              payment_status: 'completed',
              status: 'confirmed',
              payment_intent_id: session.payment_intent as string
            })
            .eq('id', orderId)

          // Clear user's cart
          if (userId) {
            await cart.clearCart(userId)
          }

          // Send order confirmation notification
          // TODO: Implement email/SMS notifications
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Find order by payment intent ID
        const { data: order } = await supabaseAdmin
          .from('orders')
          .select('id')
          .eq('payment_intent_id', paymentIntent.id)
          .single()

        if (order) {
          await supabaseAdmin
            .from('orders')
            .update({
              payment_status: 'failed',
              status: 'cancelled'
            })
            .eq('id', order.id)
        }
        break
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute
        
        // Handle dispute - mark order for review
        const { data: order } = await supabaseAdmin
          .from('orders')
          .select('id')
          .eq('payment_intent_id', dispute.payment_intent as string)
          .single()

        if (order) {
          await supabaseAdmin
            .from('orders')
            .update({
              admin_notes: `Dispute created: ${dispute.reason}`,
              status: 'cancelled'
            })
            .eq('id', order.id)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}