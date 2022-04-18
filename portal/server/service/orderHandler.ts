import { Product } from 'models'
import ProductModel from 'models/mongodb/product'
import { priceFormatter } from 'utils'

const generatePickupNumber = () => {
	const characters = '0123456789'
	let result = ''
	for (var i = 0; i < 6; i++) {
		result += characters.charAt(Math.floor(Math.random() * 6))
	}
	return result
}

const checkProductsStock = async (products: Product[]) => {
	const orderedProductIds: string[] = []
	products.forEach((product: Product) => {
		orderedProductIds.push(product._id)
	})
	const getProductsResult = await ProductModel.find({
		_id: { $in: orderedProductIds }
	})
	const outOfStockProductsIds: string[] = []
	getProductsResult.forEach((product: Product) => {
		const findOrderedProductResult = products.find(
			(orderedProduct: Product) => orderedProduct._id === product._id.toString()
		)
		if (Number(product.stock) < Number(findOrderedProductResult?.quantity)) {
			outOfStockProductsIds.push(product._id.toString())
		}
	})
	return outOfStockProductsIds
}

const orderCalculator = async (products: Product[]) => {
	const orderedProductIds: string[] = []
	products.forEach((product: Product) => {
		orderedProductIds.push(product._id)
	})
	const getProductsResult = await ProductModel.find({
		_id: { $in: orderedProductIds }
	})
	const orderedProducts: Product[] = []
	let subtotal = 0
	getProductsResult.forEach((productResult: Product) => {
		products.forEach((product: Product) => {
			if (product._id === productResult._id.toString()) {
				productResult.quantity = product.quantity
			}
			orderedProducts.push(productResult)
		})
		subtotal += Number(productResult.price) * Number(productResult.quantity)
	})
	const tax = subtotal * 0.15
	const total = subtotal + tax
	return {
		subtotal: priceFormatter(subtotal),
		total: priceFormatter(total),
		tax: priceFormatter(tax)
	}
}
export { generatePickupNumber, orderCalculator, checkProductsStock }
