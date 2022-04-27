import ProductModel from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2020-08-27'
})
const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const sig: any = req.headers['stripe-signature']
	try {
		const event: Stripe.Event = stripe.webhooks.constructEvent(
			req.body,
			sig,
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
				const orderedProducts: { productId: string; quantity: number }[] =
					JSON.parse(stripeObject.metadata.orderedProducts)
				orderedProducts.forEach(async orderedProduct => {
					const product = await ProductModel.findOne({
						_id: orderedProduct.productId
					})
					product.stock = product.stock - orderedProduct.quantity
					await product.save()
				})
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
