// import { getAccountId } from 'services/token'
export let globalAccountId = ''
export const verifyAuth = () => (req: any, res: any, next: any) => {
	const { headers } = req
	const { authorization } = headers
	// if (authorization) {
	// 	const accountId = getAccountId(authorization as string)
	// 	globalAccountId = accountId as string
	// 	if (accountId) {
	// 		next()
	// 	} else {
	// 		res.status(403).json()
	// 	}
	// } else {
	// 	res.status(403).json()
	// }
	res.status(403).json()
}
