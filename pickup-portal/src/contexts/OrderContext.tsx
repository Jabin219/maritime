import { getOrderByPhoneOrPickupNumber } from 'axios/order'
import { OrderStatus } from 'constants/index'
import { Order, Product } from 'models'
import { useState, createContext } from 'react'

export const OrderContext = createContext<any>(null)
interface Props {
	children: any
}
const OrderContextProvider = ({ children }: Props) => {
	const [orders, setOrders] = useState<Order[]>()
	const [searchedString, setSearchedString] = useState('')
	const [selectedOrder, setSelectedOrder] = useState<Order>()
	const [orderProducts, setOrderProducts] = useState<Product[]>()
	const [buttonDisabled, setButtonDisabled] = useState(false)
	const findSelectedOrder = (orderId: string) => {
		const order = orders?.find((order: Order) => order._id === orderId)
		setSelectedOrder(order)
		setOrderProducts(JSON.parse(order?.products as string))
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
				orderProducts,
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
