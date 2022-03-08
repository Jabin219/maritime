import React, { useState } from 'react'

export const OrderContext = React.createContext<any>(null)
interface Props {
	children: any
}
const OrderContextProvider = ({ children }: Props) => {
	const [order, setOrder] = useState({})
	return (
		<OrderContext.Provider
			value={{
				order,
				setOrder
			}}
		>
			{children}
		</OrderContext.Provider>
	)
}

export default OrderContextProvider
