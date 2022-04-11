import axios from 'axios'

const getProductsByPagination = (
	pagination: number,
	category: string,
	sortMethod: string
) =>
	axios.get('/api/get/products-by-pagination', {
		params: { pagination, category, sortMethod }
	})

const getProductsCount = (category: string) =>
	axios.get('/api/get/products-count', {
		params: { category }
	})

const getProductById = (productId: string) =>
	axios.get('/api/get/product-by-id', {
		params: { productId }
	})

const getCategories = () => axios.get('/api/get/categories')

export {
	getProductsByPagination,
	getProductsCount,
	getCategories,
	getProductById
}
