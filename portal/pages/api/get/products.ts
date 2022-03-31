import connectDB from 'middleware/mongodb'
import Product from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { pagination, category, sortMethod } = req.query
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
		const findAllProductsResult = await Product.find(filter)
			.limit(20)
			.skip(20 * (Number(pagination) - 1))
			.sort(sortCondition)

		if (!findAllProductsResult) {
			res.status(200).json({ status: 'fail', message: 'no products' })
		} else {
			res
				.status(200)
				.json({ status: 'success', products: findAllProductsResult })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 'fail', message: err })
	}
}
export default connectDB(handler)
