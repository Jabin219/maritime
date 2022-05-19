import OrderModel from 'models/mongodb/order'
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { OrderStatus } from 'constant'
import { sendOrderConfirmation } from 'services/emailHandler'
import { Product } from 'models'
import { decreaseOrderedProductsStock } from 'services/orderHandler'
import { stripe } from 'services/stripeHandler'
import { buffer } from 'micro'

export const config = {
	api: {
		bodyParser: false
	}
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const bufferReq = await buffer(req)
		const signature: any = req.headers['stripe-signature']
		console.log(`====================signature: ${signature}`)
		try {
			const event: Stripe.Event = stripe.webhooks.constructEvent(
				bufferReq,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET as string
			)
			switch (event.type) {
				case 'payment_intent.succeeded':
					const stripeObject: Stripe.PaymentIntent = event.data
						.object as Stripe.PaymentIntent
					const orderId = stripeObject.metadata.orderId
					console.log(
						`💰 PaymentIntent status: ${stripeObject.status} for order ${orderId}`
					)
					const orderResult = await OrderModel.findById(orderId)
					const orderedProducts: Product[] = JSON.parse(orderResult.products)
					decreaseOrderedProductsStock(orderedProducts)
					orderResult.status = OrderStatus.paid
					await orderResult.save()
					sendOrderConfirmation(orderResult)
					break
				default:
					console.log(`Unhandled event type ${event.type}`)
			}
		} catch (err: any) {
			console.error(err)
			res.status(400).send(`Webhook Error: ${err.message}`)
			return
		}
		// Return a response to acknowledge receipt of the event
		res.json({ received: true })
	} else {
		res.status(405).send('Method Not Allowed')
	}
}
export default handler
