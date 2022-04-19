import { Order } from 'models'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createPaymentIntent = (
	totalPrice: number | string,
	orderId: string,
	orderedProducts: string
) =>
	stripe.paymentIntents.create({
		amount: (Number(totalPrice) * 100).toFixed(0),
		currency: 'cad',
		metadata: { orderId, orderedProducts } || {}
	})

export { createPaymentIntent, stripe }
