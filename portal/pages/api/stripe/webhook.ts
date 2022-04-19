import ProductModel from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const sig = req.headers['stripe-signature']
	try {
		const event: Stripe.Event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		)
		switch (event.type) {
			case 'payment_intent.succeeded':
				const stripeObject: Stripe.PaymentIntent = event.data
					.object as Stripe.PaymentIntent
				const orderId = stripeObject.metadata.orderId
				console.log(
					`💰 PaymentIntent status: ${stripeObject.status} for order ${orderId}`
				)
			// 这里之后继续开发
			// const orderedProducts: { productId: string; quantity: number }[] =
			// 	JSON.parse(stripeObject.metadata.orderedProducts)
			// orderedProducts.forEach(orderedProduct => {
			// 	ProductModel.findOne({ _id: orderedProduct.productId })
			// })
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
}
export default handler
