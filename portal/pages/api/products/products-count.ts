import connectDB from '../middleware/mongodb'
import Product from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { RESPONSE_STATUS } from '../constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { category } = req.query
	let filter: any = {}
	if (category === 'new-arrivals' || category === 'all-products' || !category) {
		filter = {}
	} else {
		filter = { category }
	}
	try {
		const productsCount = await Product.count(filter)
		if (!productsCount) {
			res
				.status(200)
				.json({ status: RESPONSE_STATUS.NOT_FOUND, message: 'No products' })
		} else {
			res.status(200).json({
				status: RESPONSE_STATUS.SUCCESS,
				count: productsCount
			})
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: RESPONSE_STATUS.FAIL, message: err })
	}
}
export default connectDB(handler)
