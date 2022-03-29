import axios from 'axios'

const getProducts = (data: any) =>
	axios.get('/api/get/products', {
		params: { ...data }
	})

export { getProducts }
