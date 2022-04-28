import connectDB from '../middleware/mongodb'
import ProductModel from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseStatus } from 'constant'
import { ObjectId } from 'mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { productId } = req.query
	try {
		const product = await ProductModel.findOne({ _id: productId })
		const recommendedProducts = await ProductModel.aggregate([
			{
				$match: {
					$and: [
						{ _id: { $ne: new ObjectId(String(productId)) } },
						{ category: String(product._doc.category) },
						{ stock: { $gte: 1 } }
					]
				}
			},
			{ $sample: { size: 4 } }
		])
		product._doc.recommendedProducts = recommendedProducts
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
