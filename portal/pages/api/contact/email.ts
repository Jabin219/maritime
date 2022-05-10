import connectDB from 'middleware/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseStatus } from 'constant'
import { sendContactEmail } from 'services/emailHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { contactContent } = req.body
	try {
		sendContactEmail(contactContent)
		res.status(200).json({
			status: ResponseStatus.SUCCESS
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: ResponseStatus.FAIL, message: err })
	}
}
export default connectDB(handler)
