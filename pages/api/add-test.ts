import connectDB from '../../middleware/mongodb'
import Test from '../../models/test'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { name } = req.body
	if (req.method === 'POST') {
		try {
			const test = new Test({ name: name })
			const testAddedResult = await test.save()
			res.send(testAddedResult)
		} catch (error) {
			console.error(error)
			res.status(500)
		}
	} else {
		res.status(422).send('req_method_not_supported')
	}
}

export default connectDB(handler)
