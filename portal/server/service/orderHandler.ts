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

const checkProductsStock = async (
	orderedProducts: { productId: string; quantity: number }[]
) => {
	const orderedProductIds = orderedProducts.map(product => product.productId)
	const orderedProductsResult = await ProductModel.find({
		_id: { $in: orderedProductIds }
	})
	const outOfStockProductIds: string[] = []
	orderedProductsResult.forEach(product => {
		if (
			Number(
				orderedProducts.find(
					orderedProduct => orderedProduct.productId === product.id
				)?.quantity
			) > product.stock
		) {
			outOfStockProductIds.push(product._id)
		}
	})
	return outOfStockProductIds
}

const orderCalculator = async (
	orderedProducts: { productId: string; quantity: number }[]
) => {
	const orderedProductIds = orderedProducts.map(product => product.productId)
	const loadedProductsResult = await ProductModel.find({
		_id: { $in: orderedProductIds }
	})
	let subtotal = 0
	loadedProductsResult.forEach((product: Product) => {
		orderedProducts.forEach(orderedProduct => {
			if (orderedProduct.productId === product._id.toString()) {
				subtotal += Number(product.price) * Number(orderedProduct.quantity)
			}
		})
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
