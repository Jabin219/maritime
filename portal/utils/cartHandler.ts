import { Product } from 'models'

// init cartStorage
export const cartStorage: Product[] =
	typeof window !== 'undefined' && localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart') as any)
		: ([] as Product[])

export const saveCart = (cart: Product[]) => {
	localStorage.setItem('cart', JSON.stringify(cart))
}
export const addToCart = (cartStorage: Product[], product: Product) => {
	const findSameItemIndex: number = cartStorage.findIndex(
		(cartProduct: Product) => {
			return product.id === cartProduct.id
		}
	)
	if (findSameItemIndex !== -1) {
		;(cartStorage[findSameItemIndex].quantity as number) += Number(
			product.quantity
		)
		saveCart(cartStorage)
		return false
	} else {
		cartStorage.push(product)
		saveCart(cartStorage)
		return true
	}
}
export const removeItem = (cartStorage: Product[], item: Product) => {
	for (let i = 0; i < cartStorage.length; i++) {
		if (cartStorage[i].id === item.id) {
			cartStorage.splice(i, 1)
			saveCart(cartStorage)
		}
	}
}

export const countCartTotal = (cartStorage: Product[]) => {
	const sum = cartStorage.reduce((total: number, cartItem: Product) => {
		return total + Number(cartItem.price) * Number(cartItem.quantity)
	}, 0)
	return sum
}

export const checkSameProduct = (cartStorage: Product[], product: Product) => {
	return cartStorage.find((cartItem: Product) => cartItem.id === product.id)
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
		(product: Product) => product.id === item.id && Number(product.quantity) > 1
	)
	currentCartProducts[findProductIndex] &&
		(currentCartProducts[findProductIndex] as any).quantity--
	setCart(currentCartProducts)
	saveCart(currentCartProducts)
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
		(product: Product) => product.id === item.id
	)
	currentCartProducts[findProductIndex] &&
		(currentCartProducts[findProductIndex] as any).quantity++
	setCart(currentCartProducts)
	saveCart(currentCartProducts)
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
		return product.id !== item.id
	})
	setCart(newProductList)
	saveCart(newProductList)
	setOrder({
		...order,
		products: newProductList,
		subtotal: countCartTotal(newProductList)
	})
}