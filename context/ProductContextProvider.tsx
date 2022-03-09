import React, { useState } from 'react'
import { cartStorage, countCartTotal } from '../utils/cartHandler'

export const ProductContext = React.createContext<any>(null)
interface Props {
	children: any
}
const ProductContextProvider = ({ children }: Props) => {
	const [category, setCategory] = useState('all')
	const [cart, setCart] = useState(cartStorage)
	return (
		<ProductContext.Provider
			value={{
				category,
				setCategory,
				cart,
				setCart
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}

export default ProductContextProvider
