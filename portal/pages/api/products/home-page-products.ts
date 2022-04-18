import connectDB from '../middleware/mongodb'
import Product from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { RESPONSE_STATUS } from '../constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { categories } = req.query
	let products: any = {}
	try {
		const newArrivalsProducts = await Product.find({
			stock: { $gt: 0 }
		})
			.limit(4)
			.sort({ createdAt: 'desc' })
		const categoryProducts = await Product.find({
			$and: [{ category: { $in: categories } }, { stock: { $gt: 0 } }]
		})
			.limit(4)
			.sort({ createdAt: 'desc' })

		// categoryProducts.forEach(product => {
		//     if(product.category==='')
		// })

		// if (!allProducts) {
		// 	res.status(200).json({
		// 		status: RESPONSE_STATUS.NOT_FOUND,
		// 		message: 'There are no products for these conditions'
		// 	})
		// } else {
		// 	res.status(200).json({
		// 		status: RESPONSE_STATUS.SUCCESS,
		// 		products: allProducts
		// 	})
		// }
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: RESPONSE_STATUS.FAIL, message: err })
	}
}
export default connectDB(handler)
