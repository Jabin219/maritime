import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BASE_SERVER_URL
const addNewProduct = (productInformation: any, imageUrls: string[]) =>
	axios.post('/api/products/add-new-product', {
		productInformation,
		imageUrls
	})

export { addNewProduct }
