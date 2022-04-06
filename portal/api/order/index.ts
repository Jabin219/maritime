import axios from 'axios'

const createOrder = (data: any) =>
	axios.post('/api/order/create-order', {
		...data
	})

export { createOrder }
