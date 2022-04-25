import { Box } from '@mui/material'
import { useContext, useState } from 'react'
import { ProductContext } from 'context/ProductContextProvider'
import { countCartTotal } from 'utils/cartHandler'
import PaymentInfoContainer from 'components/order/paymentInformation'
import ShoppingCartContainer from 'components/order/shoppingCart/ShoppingCartContainer'
import OrderContextProvider from 'context/OrderContextProvider'
import OrderConfirmation from 'components/order/orderConfirmation'
import { PaymentMethod } from 'constant'
import { Order } from 'models'

const Order = () => {
	const [shippingMethod, setShippingMethod] = useState('pickup')
	const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.creditCard)
	const { cart, setCart, orderStep, setOrderStep } = useContext(ProductContext)
	const [order, setOrder] = useState<Order>({
		subtotal: countCartTotal(cart)
	})

	const clearCart = () => {
		setCart([])
		localStorage.removeItem('cart')
	}
	const next = () => {
		if (orderStep < 2) {
			setOrderStep(orderStep + 1)
		}
	}

	return (
		<OrderContextProvider
			value={{
				orderStep,
				setOrderStep,
				order,
				setOrder,
				setShippingMethod,
				setPaymentMethod,
				shippingMethod,
				paymentMethod,
				clearCart,
				next
			}}
		>
			<Box className='order-process-container' sx={{ margin: '70px 40px' }}>
				{orderStep === 0 && <ShoppingCartContainer />}
				{orderStep === 1 &&
					(order.total ? <PaymentInfoContainer /> : <ShoppingCartContainer />)}
				{orderStep === 2 &&
					(order.createdAt ? <OrderConfirmation /> : <ShoppingCartContainer />)}
			</Box>
		</OrderContextProvider>
	)
}

export default Order
