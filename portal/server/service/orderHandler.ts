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
	const outOfStockProducts: any[] = []
	getProductsResult.forEach((product: any) => {
		const findOrderedProductResult = products.find(
			(orderedProduct: any) => orderedProduct._id === product._id.toString()
		)
		if (product.stock < findOrderedProductResult.quantity) {
			outOfStockProducts.push(product._id.toString())
		}
	})
	return outOfStockProducts
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
