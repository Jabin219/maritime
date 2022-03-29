import Account from './admin/account'
export type Product = {
	id: string
	name: string
	price: string | number
	originalPrice: string | number
	coverImage: string
	images: Array<string>
	category: string
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
