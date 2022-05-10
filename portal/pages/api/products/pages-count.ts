import connectDB from 'middleware/mongodb'
import ProductModel from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseStatus } from 'constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { category } = req.query
	let filter: any = {}
	if (category === 'new-arrivals' || category === 'all-products') {
		filter = { stock: { $gte: 1 } }
	} else {
		filter = { $and: [{ category: category }, { stock: { $gte: 1 } }] }
	}
	try {
		const productsCount = await ProductModel.count(filter)
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
