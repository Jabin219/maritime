import { getOrderByPhoneOrPickupNumber } from 'axios/order'
import { OrderStatus } from 'constants/index'
import { Order } from 'models'
import { useState, createContext } from 'react'

export const OrderContext = createContext<any>(null)
interface Props {
	children: any
}
const OrderContextProvider = ({ children }: Props) => {
	const [orders, setOrders] = useState<Order[]>()
	const [searchedString, setSearchedString] = useState('')
	const [selectedOrder, setSelectedOrder] = useState<Order>()
	const [buttonDisabled, setButtonDisabled] = useState(false)
	const findSelectedOrder = (orderId: string) => {
		const order = orders?.find((order: Order) => order._id === orderId)
		setSelectedOrder(order)
	}
	const handleSearchOrders = async (searchedString: string) => {
		const ordersResult = await (getOrderByPhoneOrPickupNumber(
			searchedString
		) as any)
		setOrders(ordersResult.data.orders)
	}
	const getOrderStatusButtonContent = (orderStatus: string) => {
		switch (orderStatus) {
			case OrderStatus.reserved:
				return 'Unpaid'
			case OrderStatus.paid:
				return 'Paid'
			case OrderStatus.expired:
				return 'Expired'
			case OrderStatus.completed:
				return 'Completed'
			default:
				return 'Unpaid'
		}
	}

	return (
		<OrderContext.Provider
			value={{
				orders,
				setOrders,
				findSelectedOrder,
				selectedOrder,
				getOrderStatusButtonContent,
				buttonDisabled,
				setButtonDisabled,
				searchedString,
				setSearchedString,
				handleSearchOrders
			}}
		>
			{children}
		</OrderContext.Provider>
	)
}

export default OrderContextProvider
