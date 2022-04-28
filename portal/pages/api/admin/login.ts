import type { NextApiRequest, NextApiResponse } from 'next'
import passwordHash from 'password-hash'
import { Account } from 'models'
import connectDB from '../middleware/mongodb'
import { corsHandler } from '../whoami'
import { setToken } from '../services/token'
import { ResponseStatus } from 'constant'

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	corsHandler(req, res)
	const { username, password } = req.body
	try {
		const account = await Account.findOne({ username })
		if (!account) {
			res.status(200).json({
				status: ResponseStatus.NOT_FOUND,
				message: 'Incorrect username'
			})
		} else if (!passwordHash.verify(password, account.password)) {
			res.status(200).json({
				status: ResponseStatus.NOT_FOUND,
				message: 'Incorrect password'
			})
		} else {
			const accountId = account._id
			const token = setToken(accountId.toString())
			res.status(200).json({
				status: ResponseStatus.SUCCESS,
				message: 'login success',
				token: token
			})
		}
	} catch (err) {
		console.error(err)
		res
			.status(500)
			.json({ status: ResponseStatus.FAIL, message: 'server_down' })
	}
}
export default connectDB(loginHandler)

/**
 *
 * @param arg0
 * for deploy test,
 * import { getToken } from 'services/token' is not found,
 * here is just a dummy function, could be deleted later
 */
function getToken(arg0: any) {
	throw new Error('Function not implemented.')
}
