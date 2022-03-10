import { createContext } from 'react'

export const OrderContext = createContext<any>(null)

interface Props {
	children: any
	value: any
}

const OrderContextProvider = ({ children, value }: Props) => {
	return (
		<OrderContext.Provider
			value={{
				...value
			}}
		>
			{children}
		</OrderContext.Provider>
	)
}

export default OrderContextProvider
