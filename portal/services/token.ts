import NodeCache from 'node-cache'
import crypto from 'crypto'

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 60 * 60 * 24 })

export const getAccountId = (token: string) => {
	const accountId = myCache.get(token)
	return accountId
}

export const setToken = (accountId: string) => {
	const token = generateToken()
	myCache.set(token, accountId, 60 * 60 * 24 * 1000)
	return token
}

const generateToken = () => crypto.randomBytes(16).toString('base64')
