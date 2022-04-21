import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL

const getProductsByPagination = (
	currentPage: number,
	category: string,
	sortMethod: string
) =>
	axios.get('/api/products/products-by-pagination', {
		params: { currentPage, category, sortMethod }
	})

const getProductsCount = (category: string) =>
	axios.get('/api/products/products-count', {
		params: { category }
	})

const getProductById = (productId: string) =>
	axios.get('/api/products/product-by-id', {
		params: { productId }
	})

const getCategories = () => axios.get('/api/categories')

export {
	getProductsByPagination,
	getProductsCount,
	getCategories,
	getProductById
}
