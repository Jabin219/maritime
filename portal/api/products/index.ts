import axios from 'axios'

const getProductsByCategory = (
	currentPage: number,
	category: string,
	sortMethod: string
) =>
	axios.get('/api/products/products-by-category', {
		params: { currentPage, category, sortMethod }
	})

const getPagesCount = (category: string) =>
	axios.get('/api/products/pages-count', {
		params: { category }
	})

const getProductById = (productId: string) =>
	axios.get('/api/products/product-by-id', {
		params: { productId }
	})

const getHomePageProducts = (categories: string) =>
	axios.get('/api/products/home-page-products', {
		params: { categories }
	})

export {
	getProductsByCategory,
	getPagesCount,
	getProductById,
	getHomePageProducts
}
