import { Product } from 'models'

// init cartStorage
export const cartStorage: Product[] =
	typeof window !== 'undefined' && localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart') as any)
		: ([] as Product[])

export const saveCart = (cart: Product[]) => {
	localStorage.setItem('cart', JSON.stringify(cart))
}
export const addToCart = (
	cartStorage: Product[],
	product: Product,
	setCart: (cart: Product[]) => void
) => {
	const findSameItemIndex: number = cartStorage.findIndex(
		(cartProduct: Product) => {
			return product._id === cartProduct._id
		}
	)
	if (findSameItemIndex !== -1) {
		;(cartStorage[findSameItemIndex].quantity as number) += Number(
			product.quantity
		)
	} else {
		cartStorage.push(product)
	}
	setCart([...cartStorage])
}

export const countCartTotal = (cart: Product[]) => {
	const sum = cart.reduce((total: number, cartItem: Product) => {
		return total + Number(cartItem.price) * Number(cartItem.quantity)
	}, 0)
	return sum
}

export const quantityDecrease = (
	item: Product,
	cart: Product[],
	setCart: (cart: Product[]) => void,
	order: any,
	setOrder: (order: any) => void
) => {
	const currentCartProducts: Product[] = [...cart]
	const findProductIndex = currentCartProducts.findIndex(
		(product: Product) =>
			product._id === item._id && Number(product.quantity) > 1
	)
	currentCartProducts[findProductIndex] &&
		(currentCartProducts[findProductIndex] as any).quantity--
	setCart(currentCartProducts)
	setOrder({
		...order,
		products: currentCartProducts,
		subtotal: countCartTotal(currentCartProducts)
	})
}
export const quantityIncrease = (
	item: Product,
	cart: Product[],
	setCart: (cart: Product[]) => void,
	order: any,
	setOrder: (order: any) => void
) => {
	const currentCartProducts: Product[] = [...cart]
	const findProductIndex = currentCartProducts.findIndex(
		(product: Product) => product._id === item._id
	)
	currentCartProducts[findProductIndex] &&
		(currentCartProducts[findProductIndex] as any).quantity++
	setCart(currentCartProducts)
	setOrder({
		...order,
		products: currentCartProducts,
		subtotal: countCartTotal(currentCartProducts)
	})
}
export const itemRemove = (
	item: Product,
	cart: Product[],
	setCart: (cart: Product[]) => void,
	order: any,
	setOrder: (order: any) => void
) => {
	const newProductList = cart.filter((product: Product) => {
		return product._id !== item._id
	})
	setCart(newProductList)
	setOrder({
		...order,
		products: newProductList,
		subtotal: countCartTotal(newProductList)
	})
}
