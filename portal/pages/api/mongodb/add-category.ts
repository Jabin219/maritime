import connectDB from '../../../middleware/mongodb'
import Category from 'models/mongodb/category'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { name, label } = req.body
	if (req.method === 'POST') {
		try {
			const category = new Category({ name, label })
			const categoryAddedResult = await category.save()
			res.send(categoryAddedResult)
		} catch (error) {
			console.error(error)
			res.status(500)
		}
	} else {
		res.status(422).send('req_method_not_supported')
	}
}

export default connectDB(handler)
