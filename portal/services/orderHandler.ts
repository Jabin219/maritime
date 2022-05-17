import { Product } from 'models'
import ProductModel from 'models/mongodb/product'

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
	if (products) {
		const productsWithQuantity = [] as Product[]
		orderedProducts.forEach(
			(orderedProduct: { productId: string; quantity: number }) => {
				const product = {
					...products.find(
						(product: Product) =>
							product._id.toString() === orderedProduct.productId
					)._doc,
					quantity: orderedProduct.quantity
				}
				productsWithQuantity.push(product)
			}
		)
		return productsWithQuantity
	} else {
		return []
	}
}

const checkProductsStock = (products: Product[]) => {
	const outOfStockProductIds: string[] = []
	products.forEach(product => {
		if (Number(product.quantity) > Number(product.stock)) {
			outOfStockProductIds.push(product._id)
		}
	})
	return outOfStockProductIds
}

const orderCalculator = (products: Product[]) => {
	let subtotal = 0
	products.forEach((product: Product) => {
		subtotal += Number(product.price) * Number(product.quantity)
	})
	const tax = subtotal * 0.15
	const total = subtotal + tax
	return {
		subtotal: subtotal.toFixed(2),
		total: total.toFixed(2),
		tax: tax.toFixed(2)
	}
}

const decreaseOrderedProductsStock = async (orderedProducts: Product[]) => {
	const updatingStockFunctions = orderedProducts.map(
		async (orderedProduct: any) => {
			const selectedProductResult: any = await ProductModel.findOne({
				_id: orderedProduct._id
			})
			selectedProductResult.stock =
				selectedProductResult.stock - orderedProduct.quantity
			await selectedProductResult.save()
		}
	)
	await Promise.all(updatingStockFunctions)
}
export {
	generatePickupNumber,
	orderCalculator,
	checkProductsStock,
	loadOrderedProducts,
	decreaseOrderedProductsStock
}
