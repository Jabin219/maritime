import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2020-08-27'
})

const createPaymentIntent = (
	totalPrice: number | string,
	orderId: string,
	orderedProducts: string
) =>
	stripe.paymentIntents.create({
		amount: Number((Number(totalPrice) * 100).toFixed(0)),
		currency: 'cad',
		metadata: { orderId, orderedProducts } || {}
	})

export { createPaymentIntent, stripe }
