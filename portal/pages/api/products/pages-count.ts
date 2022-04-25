import connectDB from '../middleware/mongodb'
import Product from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseStatus } from 'constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { category } = req.query
	let filter: any = {}
	if (category === 'new-arrivals' || category === 'all-products') {
		filter = {}
	} else {
		filter = { category }
	}
	try {
		const productsCount = await Product.count(filter)
		const pagesCount = Math.ceil(productsCount / 20) || 1
		if (!productsCount) {
			res
				.status(200)
				.json({ status: ResponseStatus.NOT_FOUND, message: 'No products' })
		} else {
			res.status(200).json({
				status: ResponseStatus.SUCCESS,
				count: pagesCount
			})
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: ResponseStatus.FAIL, message: err })
	}
}
export default connectDB(handler)
