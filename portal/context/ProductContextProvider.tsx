import { Product } from 'models'
import { useState, createContext, useEffect } from 'react'
import { cartStorage, saveCart } from 'utils/cartHandler'
import { SortMethod } from 'constant'
import { loadStripe } from '@stripe/stripe-js'

export const ProductContext = createContext<any>(null)
interface Props {
	children: any
}
const ProductContextProvider = ({ children }: Props) => {
	const [orderStep, setOrderStep] = useState(0)
	const [cart, setCart] = useState<Product[]>(cartStorage)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortMethod, setSortMethod] = useState(SortMethod.newArrivals)
	let cachedProducts: any = []
	const handleChangeCategory = () => {
		cachedProducts.splice(0, cachedProducts.length)
		setCurrentPage(1)
	}
	const stripePromise = loadStripe(
		`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
	)
	useEffect(() => {
		cachedProducts.splice(0, cachedProducts.length)
	}, [sortMethod])
	useEffect(() => {
		saveCart(cart)
	}, [cart])

	return (
		<ProductContext.Provider
			value={{
				cart,
				setCart,
				currentPage,
				setCurrentPage,
				cachedProducts,
				sortMethod,
				setSortMethod,
				orderStep,
				setOrderStep,
				handleChangeCategory,
				stripePromise
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}

export default ProductContextProvider
