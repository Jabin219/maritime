import React, { useState } from 'react'

export const ProductContext = React.createContext<any>(null)
interface Props {
	children: any
}
const ProductContextProvider = ({ children }: Props) => {
	const [category, setCategory] = useState('all')
	return (
		<ProductContext.Provider
			value={{
				category,
				setCategory
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}

export default ProductContextProvider
