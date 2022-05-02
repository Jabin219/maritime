import connectDB from 'middleware/mongodb'
import Category from 'models/mongodb/category'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseStatus } from 'constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const allCategories = await Category.find()
		if (!allCategories) {
			res
				.status(200)
				.json({ status: ResponseStatus.NOT_FOUND, message: 'no categories' })
		} else {
			res.status(200).json({
				status: ResponseStatus.SUCCESS,
				categories: allCategories
			})
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: ResponseStatus.FAIL, message: err })
	}
}
export default connectDB(handler)
