import axios from 'axios'
import { Product, ContactInformation } from 'models'

const createOrder = (
	contactInformation: ContactInformation,
	shippingMethod: string,
	paymentMethod: string,
	products: Product[]
) =>
	axios.post('/api/orders/create-order', {
		contactInformation,
		shippingMethod,
		paymentMethod,
		products
	})

export { createOrder }
