import connectDB from '../middleware/mongodb'
import Product from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { category } = req.query
	let filter: any = {}
	if (category === 'new-arrivals' || category === 'all-products' || !category) {
		filter = {}
	} else {
		filter = { category }
	}
	try {
		const findProductsCountResult = await Product.count(filter)
		if (!findProductsCountResult) {
			res.status(200).json({ status: 'fail', message: 'no products' })
		} else {
			res
				.status(200)
				.json({ status: 'success', count: findProductsCountResult })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 'fail', message: err })
	}
}
export default connectDB(handler)
