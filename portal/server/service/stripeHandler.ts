// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createPaymentIntent = (totalPrice: any) =>
	stripe.paymentIntents.create({
		amount: (totalPrice * 100).toFixed(0),
		currency: 'cad'
	})

export { createPaymentIntent, stripe }
