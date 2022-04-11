import Account from './admin/account'
export type Product = {
	_id: string
	name: string
	price: string | number
	originalPrice: string | number
	coverImage: string
	images: Array<string>
	category: string
	quantity?: number
}

export type Category = {
	_id?: string
	name: string
	label: string
}

export { Account }
