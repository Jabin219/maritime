import connectDB from 'middleware/mongodb'
import Order from 'models/mongodb/order'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
	generatePickupNumber,
	orderCalculator
} from 'server/service/orderHandler'
import { createPaymentIntent } from 'server/service/stripeHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { products, contactInformation, paymentMethod, shippingMethod } =
		req.body

	const { subtotal, tax, total } = await orderCalculator(products)
	const pickupNumber = generatePickupNumber()
	if (req.method === 'POST') {
		try {
			const intent = await createPaymentIntent(total)
			if (!intent.client_secret) {
				res.json({ status: 'error' })
				return
			}
			const order = new Order({
				products: JSON.stringify(products),
				subtotal,
				tax,
				total,
				contactInformation: JSON.stringify(contactInformation),
				paymentMethod,
				pickupNumber,
				shippingMethod
			})
			// const orderAddedResult = await order.save()
			res.status(200).json({
				status: 'success',
				order,
				intentSecret: intent.client_secret
			})
		} catch (err) {
			console.error(err)
			res.status(500).json({ status: 'fail', message: err })
		}
	} else {
		res
			.status(400)
			.json({ status: 'fail', message: 'incorrect request method' })
	}
}
export default connectDB(handler)
