import type { NextApiRequest, NextApiResponse } from 'next'
import passwordHash from 'password-hash'
import { Account } from 'models'
import connectDB from 'pages/api/middleware/mongodb'
import { corsHandler } from '../whoami'
import { setToken } from '../services/token'
import { RESPONSE_STATUS } from '../constant'

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	corsHandler(req, res)
	const { username, password } = req.body
	try {
		const findAccountResult = await Account.findOne({ username })
		if (!findAccountResult) {
			res.status(200).json({
				status: RESPONSE_STATUS.NOT_FOUND,
				message: 'Incorrect username'
			})
		} else if (!passwordHash.verify(password, findAccountResult.password)) {
			res.status(200).json({
				status: RESPONSE_STATUS.NOT_FOUND,
				message: 'Incorrect password'
			})
		} else {
			const accountId = findAccountResult._id
			const token = setToken(accountId.toString())
			res.status(200).json({
				status: RESPONSE_STATUS.SUCCESS,
				message: 'login success',
				token: token
			})
		}
	} catch (err) {
		console.error(err)
		res
			.status(500)
			.json({ status: RESPONSE_STATUS.FAIL, message: 'server_down' })
	}
}
export default connectDB(loginHandler)
