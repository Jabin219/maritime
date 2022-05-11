import { Order } from 'models'
import { useState, createContext } from 'react'

export const OrderContext = createContext<any>(null)
interface Props {
	children: any
}
const OrderContextProvider = ({ children }: Props) => {
	const [orders, setOrders] = useState<Order[]>()
	return (
		<OrderContext.Provider value={{ orders, setOrders }}>
			{children}
		</OrderContext.Provider>
	)
}

export default OrderContextProvider
