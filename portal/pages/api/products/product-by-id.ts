import connectDB from '../middleware/mongodb'
import Product from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseStatus } from 'constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { productId } = req.query
	try {
		const product = await Product.findOne({ _id: productId })
		if (!product) {
			res.status(200).json({
				status: ResponseStatus.NOT_FOUND,
				message: 'There is no product for this id.'
			})
		} else {
			res.status(200).json({ status: ResponseStatus.SUCCESS, product: product })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: ResponseStatus.FAIL, message: err })
	}
}
export default connectDB(handler)
