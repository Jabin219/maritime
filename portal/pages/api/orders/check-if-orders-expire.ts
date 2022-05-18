import connectDB from 'middleware/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderStatus, ResponseStatus } from 'constant'
import OrderModel from 'models/mongodb/order'
import { Order, Product } from 'models'
import ProductModel from 'models/mongodb/product'
import { corsHandler } from 'services/corsHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await corsHandler(req, res)
	try {
		const ordersResult = await OrderModel.find({ status: OrderStatus.reserved })
		const orderReversedDays = 3
		const today = new Date()
		const expiredOrders: Order[] = []
		ordersResult.forEach((order: Order) => {
			const orderCreatedTime = new Date(order.createdAt as Date)
			const expiredDate = new Date(
				orderCreatedTime.setDate(orderCreatedTime.getDate() + orderReversedDays)
			)
			if (today > expiredDate) {
				expiredOrders.push(order)
			}
		})
		if (expiredOrders.length > 0) {
			const expiredOrderIds = expiredOrders.map(order => order._id)
			await OrderModel.updateMany(
				{ _id: { $in: expiredOrderIds } },
				{ status: OrderStatus.expired }
			)
			Promise.all(
				expiredOrders.map(async order => {
					const products = JSON.parse(String(order.products))
					await Promise.all(
						products.map(async (product: Product) => {
							await ProductModel.findOneAndUpdate(
								{ _id: product._id },
								{ $inc: { stock: product.quantity } }
							)
						})
					)
				})
			)
			res.status(200).json({
				status: ResponseStatus.SUCCESS,
				expiredOrders
			})
			return
		}
		res.status(200).json({
			status: ResponseStatus.NOT_FOUND
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: ResponseStatus.FAIL, message: err })
	}
}
export default connectDB(handler)
