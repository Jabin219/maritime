import connectDB from 'middleware/mongodb'
import Product from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseStatus } from 'constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { currentPage, category, sortMethod } = req.query
	let sortCondition: any = { createdAt: 'desc' }
	let filter: any = {}
	if (category === 'new-arrivals' || category === 'all-products' || !category) {
		filter = {}
	} else {
		filter = { category }
	}
	if (sortMethod === 'price-increase') {
		sortCondition = { price: 'asc' }
	} else if (sortMethod === 'price-decrease') {
		sortCondition = { price: 'desc' }
	}
	try {
		const allProducts = await Product.find(filter)
			.limit(20)
			.skip(20 * (Number(currentPage) - 1))
			.sort(sortCondition)

		if (!allProducts) {
			res.status(200).json({
				status: ResponseStatus.NOT_FOUND,
				message: 'There are no products for these conditions'
			})
		} else {
			res.status(200).json({
				status: ResponseStatus.SUCCESS,
				products: allProducts
			})
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: ResponseStatus.FAIL, message: err })
	}
}
export default connectDB(handler)
