import Account from './admin/account'
export type Product = {
	id: string
	name: string
	price: string | number
	coverImage: string
	category: string
	discount: string
	newArrival: boolean
	quantity?: number
}

export type Category = {
	id: string
	name: string
	value: string
}

export type LoginRequestData = {
	username: string
	password: string
}

export { Account }
