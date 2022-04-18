import connectDB from '../middleware/mongodb'
import Order from 'models/mongodb/order'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
	generatePickupNumber,
	orderCalculator,
	checkProductsStock
} from 'server/service/orderHandler'
import { ResponseStatus } from 'constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { orderedProducts, contactInformation, paymentMethod, shippingMethod } =
		req.body
	const checkProductsStockResult = await checkProductsStock(orderedProducts)
	if (checkProductsStockResult.length > 0) {
		res.status(200).json({
			status: ResponseStatus.OUT_OF_STOCK,
			message: 'One or more products in your cart is out of stock.',
			products: checkProductsStockResult
		})
		return
	}
	const { subtotal, tax, total } = await orderCalculator(orderedProducts)
	console.log({ subtotal, tax, total })
	const pickupNumber = generatePickupNumber()
	if (req.method === 'POST') {
		try {
			const order = new Order({
				products: JSON.stringify(orderedProducts),
				subtotal,
				tax,
				total,
				contactInformation: JSON.stringify(contactInformation),
				paymentMethod,
				pickupNumber,
				shippingMethod
			})
			res.status(200).json({
				status: ResponseStatus.SUCCESS,
				order
			})
		} catch (err) {
			console.error(err)
			res.status(500).json({ status: ResponseStatus.FAIL, message: err })
		}
	} else {
		res.status(400).json({
			status: ResponseStatus.FAIL,
			message: 'incorrect request method'
		})
	}
}
export default connectDB(handler)
