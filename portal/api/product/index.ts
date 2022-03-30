import axios from 'axios'

const getProducts = (data: any) =>
	axios.get('/api/get/products', {
		params: { ...data }
	})

const getProductsCount = (data: any) =>
	axios.get('/api/get/products-count', {
		params: { ...data }
	})

const getProductById = (data: any) =>
	axios.get('/api/get/product-by-id', {
		params: { ...data }
	})

const getCategories = () => axios.get('/api/get/categories')

export { getProducts, getProductsCount, getCategories, getProductById }
