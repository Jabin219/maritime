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
	stock?: number
	outOfStock?: boolean
}

export type Category = {
	_id?: string
	name: string
	label: string
}

export type Order = {
	_id?: string
	products: string | Product[]
	subtotal: number
	tax?: number
	total?: number
	status?: string
	contactInformation?: string | ContactInformation
	shippingMethod?: string
	paymentMethod?: string
	pickupNumber?: string
	createdAt?: Date
	expiredDate?: Date | undefined
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

export { Account }
