import connectDB from '../middleware/mongodb'
import Category from 'models/mongodb/category'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const findAllCategoriesResult = await Category.find()
		if (!findAllCategoriesResult) {
			res.status(200).json({ status: 'fail', message: 'no categories' })
		} else {
			res
				.status(200)
				.json({ status: 'success', categories: findAllCategoriesResult })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 'fail', message: err })
	}
}
export default connectDB(handler)
