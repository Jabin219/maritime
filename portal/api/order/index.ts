import axios from 'axios'

const createOrder = (data: any) =>
	axios.post('/api/create/order', {
		...data
	})

export { createOrder }
