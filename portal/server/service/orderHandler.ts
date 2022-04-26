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

const loadOrderedProducts = async (
	orderedProducts: { productId: string; quantity: number }[]
) => {
	const orderedProductIds = orderedProducts.map(
		(orderedProduct: { productId: string; quantity: number }) =>
			orderedProduct.productId
	)
	const products = await ProductModel.find({
		_id: { $in: orderedProductIds }
	})
	orderedProducts.forEach(
		(orderedProduct: { productId: string; quantity: number }) => {
			products.find(
				(product: Product) =>
					product._id.toString() === orderedProduct.productId
			).quantity = orderedProduct.quantity
		}
	)
	return products
}

const checkProductsStock = async (products: Product[]) => {
	const outOfStockProductIds: string[] = []
	products.forEach(product => {
		if (Number(product.quantity) > Number(product.stock)) {
			outOfStockProductIds.push(product._id)
		}
	})
	return outOfStockProductIds
}

const orderCalculator = async (products: Product[]) => {
	let subtotal = 0
	products.forEach((product: Product) => {
		subtotal += Number(product.price) * Number(product.quantity)
	})
	const tax = subtotal * 0.15
	const total = subtotal + tax
	return {
		subtotal: priceFormatter(subtotal),
		total: priceFormatter(total),
		tax: priceFormatter(tax)
	}
}
export {
	generatePickupNumber,
	orderCalculator,
	checkProductsStock,
	loadOrderedProducts
}
