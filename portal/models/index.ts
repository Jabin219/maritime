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
	outOfStock?: boolean
}

export type Category = {
	_id?: string
	name: string
	label: string
}

export type ContactInformation = {
	name: string
	email: string
	phone: string
}

export type LoginRequest = {
	username: string
	password: string
}

export type SnackSeverity = 'success' | 'error' | ''

export { Account }
