import connectDB from '../middleware/mongodb'
import Order from 'models/mongodb/order'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
	generatePickupNumber,
	orderCalculator,
	checkProductsStock
} from 'server/service/orderHandler'
import { RESPONSE_STATUS } from '../constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { products, contactInformation, paymentMethod, shippingMethod } =
		req.body
	const checkProductsStockResult = await checkProductsStock(products)
	if (checkProductsStockResult.length > 0) {
		res.status(200).json({
			status: 'out-of-stock',
			message: 'One or more products in your cart is out of stock.',
			products: checkProductsStockResult
		})
		return
	}
	const { subtotal, tax, total } = await orderCalculator(products)
	const pickupNumber = generatePickupNumber()
	if (req.method === 'POST') {
		try {
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
			res.status(200).json({
				status: RESPONSE_STATUS.SUCCESS,
				order
			})
		} catch (err) {
			console.error(err)
			res.status(500).json({ status: RESPONSE_STATUS.FAIL, message: err })
		}
	} else {
		res.status(400).json({
			status: RESPONSE_STATUS.FAIL,
			message: 'incorrect request method'
		})
	}
}
export default connectDB(handler)
