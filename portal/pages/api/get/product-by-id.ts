import connectDB from '../middleware/mongodb'
import Product from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { productId } = req.query
	try {
		const findProductResult = await Product.findOne({ _id: productId })
		if (!findProductResult) {
			res.status(200).json({ status: 'fail', message: 'no products' })
		} else {
			res.status(200).json({ status: 'success', product: findProductResult })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 'fail', message: err })
	}
}
export default connectDB(handler)
