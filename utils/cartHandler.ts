import { Product } from '../models'

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
		cartStorage[findSameItemIndex].quantity += product.quantity
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
		return total + Number(cartItem.price) * cartItem.quantity
	}, 0)
	return sum
}

export const checkSameProduct = (cartStorage: Product[], product: Product) => {
	return cartStorage.find((cartItem: Product) => cartItem.id === product.id)
}
