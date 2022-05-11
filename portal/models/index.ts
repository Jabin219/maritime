import Account from './admin/account'
export type Product = {
	_id: string
	name: string
	price: string | number
	originalPrice: string | number
	coverImage: string
	images: Array<string> | string
	category: string
	quantity?: number
	stock?: number
	outOfStock?: boolean
	recommendedProducts?: Product[]
}

export type Category = {
	name: string
	label: string
	showedOnHeader?: boolean
}

export type Order = {
	_id?: string
	products?: string | Product[]
	subtotal: number
	tax?: number
	total?: number
	status?: string
	contactInformation?: string | ContactInformation
	shippingMethod?: string
	paymentMethod?: string
	pickupNumber?: string
	createdAt?: Date
	expiredDate?: Date
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

export type ContactContent = {
	name: string
	email: string
	message: string
}

export { Account }
