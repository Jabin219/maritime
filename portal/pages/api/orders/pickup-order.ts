import connectDB from 'middleware/mongodb'
import OrderModel from 'models/mongodb/order'
import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderStatus, ResponseStatus } from 'constant'
import { Product } from 'models'
import ProductModel from 'models/mongodb/product'
import { corsHandler } from 'services/corsHandler'
import { decreaseOrderedProductsStock } from 'services/orderHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await corsHandler(req, res)
	const { orderId } = req.body
	try {
		const order = await OrderModel.findOne({
			_id: orderId
		})
		if (!order) {
			res.status(200).json({
				status: ResponseStatus.NOT_FOUND,
				message: 'No order for this id.'
			})
		} else {
			if (order.status === OrderStatus.expired) {
				const orderedProducts = JSON.parse(order.products)
				await decreaseOrderedProductsStock(orderedProducts)
			}
			order.status = OrderStatus.completed
			await order.save()
			res.status(200).json({ status: ResponseStatus.SUCCESS, order })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: ResponseStatus.FAIL, message: err })
	}
}
export default connectDB(handler)
