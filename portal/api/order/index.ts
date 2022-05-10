import axios from 'axios'
import { ContactInformation } from 'models'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL

const createOrder = (
	contactInformation: ContactInformation,
	shippingMethod: string,
	paymentMethod: string,
	orderedProducts: { productId: string; quantity: number }[]
) =>
	axios.post('/api/orders/create-order', {
		contactInformation,
		shippingMethod,
		paymentMethod,
		orderedProducts
	})

export { createOrder }
