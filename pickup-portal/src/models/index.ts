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
	recommendedProducts?: Product[]
}

export type Order = {
	_id?: string
	products?: string | Product[]
	subtotal: number
	tax?: number
	total?: number
	status?: string
	contactInformation?: ContactInformation
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
