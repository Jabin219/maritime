import connectDB from 'middleware/mongodb'
import OrderModel from 'models/mongodb/order'
import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderStatus, ResponseStatus } from 'constant'
import { Product } from 'models'
import ProductModel from 'models/mongodb/product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { orderId } = req.query
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
			const orderedProducts = JSON.parse(order.products)
			const productIds = orderedProducts.map((product: Product) => product._id)
			const databaseProducts = await ProductModel.find({
				_id: { $in: productIds }
			})
			orderedProducts.forEach((orderedProduct: Product) => {
				const selectedProduct = databaseProducts.find(
					databaseProduct =>
						databaseProduct._id.toString() === orderedProduct._id
				)
				if (selectedProduct.stock < Number(orderedProduct.quantity)) {
					orderedProduct.outOfStock = true
				}
			})
			res
				.status(200)
				.json({ status: ResponseStatus.SUCCESS, products: orderedProducts })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: ResponseStatus.FAIL, message: err })
	}
}
export default connectDB(handler)
