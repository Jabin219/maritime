import Product from 'models/mongodb/product'

const generateOrderNumber = () => {
	let result = ''
	const characterInit: string = '1234567890'
	for (let i = 0; i < 13; i++) {
		if (i === 0) {
			result += characterInit.charAt(
				Math.floor(Math.random() * characterInit.length)
			)
		}
		result += Math.floor(Math.random() * 10)
	}
	return result
}
const generatePickupNumber = () => {
	const characters = '0123456789'
	let result = ''
	for (var i = 0; i < 6; i++) {
		result += characters.charAt(Math.floor(Math.random() * 6))
	}
	return result
}

const orderCalculator = (products: []) => {
	const orderProducts: [] = []
	products.forEach(async (product: any) => {
		const getProductResult = await Product.findOne({ _id: product._id })
		orderProducts.push(getProductResult)
	})
	let subtotal = 0
	orderProducts.forEach((product: any) => {
		subtotal += product.price
	})
	const tax = subtotal * 0.15
	const total = subtotal + tax
	return { subtotal, total, tax }
}

export { generateOrderNumber, generatePickupNumber, orderCalculator }
