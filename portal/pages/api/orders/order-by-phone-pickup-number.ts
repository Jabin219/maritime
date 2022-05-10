import connectDB from 'middleware/mongodb'
import OrderModel from 'models/mongodb/order'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseStatus } from 'constant'
import { corsHandler } from 'services/corsHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	corsHandler(req, res)
	const { searchedString } = req.query
	try {
		const orders = await OrderModel.find({
			$or: [
				{ pickupNumber: searchedString },
				{ 'contactInformation.phone': searchedString }
			]
		}).sort({ createdAt: 'desc' })
		if (!orders) {
			res.status(200).json({
				status: ResponseStatus.NOT_FOUND,
				message: 'No orders for this number.'
			})
		} else {
			res.status(200).json({ status: ResponseStatus.SUCCESS, orders })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: ResponseStatus.FAIL, message: err })
	}
}
export default connectDB(handler)
