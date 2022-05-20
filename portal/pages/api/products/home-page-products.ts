import connectDB from 'middleware/mongodb'
import ProductModel from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseStatus } from 'constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let { categories } = req.query
	categories = JSON.parse(categories as string) as string[]
	try {
		const findCategoryProducts = async (categories: string[]) => {
			const products = await ProductModel.aggregate([
				{ $sort: { createdAt: -1 } },
				{
					$match: {
						$and: [{ category: { $in: categories } }, { stock: { $gte: 1 } }]
					}
				},
				{
					$group: {
						_id: '$category',
						products: { $push: '$$ROOT' }
					}
				},
				{
					$project: {
						resultProducts: { $slice: ['$products', 4] }
					}
				}
			])
			return products
		}
		const newArrivalsProducts = await ProductModel.find({ stock: { $gte: 1 } })
			.sort({ createdAt: 'desc' })
			.limit(4)
		const products = await findCategoryProducts(categories)
		products.push({ _id: 'new-arrivals', resultProducts: newArrivalsProducts })
		res.status(200).json({
			status: ResponseStatus.SUCCESS,
			products
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: ResponseStatus.FAIL, message: err })
	}
}
export default connectDB(handler)
