import type { NextApiRequest, NextApiResponse } from 'next'
import passwordHash from 'password-hash'
import { Account } from 'models'
import connectDB from 'pages/api/middleware/mongodb'
import { corsHandler } from '../whoami'
import { getToken } from 'services/token'

type Data = {
	status: string
	message?: string
	token?: any
}
const loginHandler = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	corsHandler(req, res)
	const { username, password } = req.body
	try {
		const findAccountResult = await Account.findOne({ username })
		if (!findAccountResult) {
			res.status(200).json({ status: 'fail', message: 'wrong username' })
		} else if (!passwordHash.verify(password, findAccountResult.password)) {
			res.status(200).json({ status: 'fail', message: 'wrong password' })
		} else {
			const accountId = findAccountResult._id
			const token = getToken(accountId.toString())
			res
				.status(200)
				.json({ status: 'success', message: 'login success', token: token })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 'fail', message: 'server_down' })
	}
}
export default connectDB(loginHandler)
