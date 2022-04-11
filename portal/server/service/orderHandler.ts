import Product from 'models/mongodb/product'
import { priceFormatter } from 'utils'

const generatePickupNumber = () => {
	const characters = '0123456789'
	let result = ''
	for (var i = 0; i < 6; i++) {
		result += characters.charAt(Math.floor(Math.random() * 6))
	}
	return result
}

const checkProductsStock = async (products: any) => {
	const orderedProductIds: any = []
	products.forEach((product: any) => {
		orderedProductIds.push(product._id)
	})
	const getProductsResult = await Product.find({
		_id: { $in: orderedProductIds }
	})
	let checkStockResult = true
	getProductsResult.forEach((product: any) => {
		if (product.stock < 1) {
			checkStockResult = false
		}
	})
	return checkStockResult
}

const orderCalculator = async (products: []) => {
	const orderedProductIds: any = []
	products.forEach((product: any) => {
		orderedProductIds.push(product._id)
	})
	const getProductsResult = await Product.find({
		_id: { $in: orderedProductIds }
	})
	const orderedProducts: any = []
	let subtotal = 0
	getProductsResult.forEach((productResult: any) => {
		products.forEach((product: any) => {
			if (product._id === productResult._id.toString()) {
				productResult.quantity = product.quantity
			}
			orderedProducts.push(productResult)
		})
		subtotal += productResult.price * productResult.quantity
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
