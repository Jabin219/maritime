import { Box } from '@mui/material'
import { useContext, useState } from 'react'
import { ProductContext } from 'context/ProductContextProvider'
import { countCartTotal } from 'utils/cartHandler'
import PaymentInfoContainer from 'components/order/paymentInformation'
import ShoppingCartContainer from 'components/order/shoppingCart/ShoppingCartContainer'
import OrderContextProvider from 'context/OrderContextProvider'
import OrderConfirmation from 'components/order/orderConfirmation/OrderConfirmation'

const Order = () => {
	const [shippingMethod, setShippingMethod] = useState('pickup')
	const [paymentMethod, setPaymentMethod] = useState('credit-card')
	const { cart, setCart, orderStep, setOrderStep } = useContext(ProductContext)
	const [order, setOrder] = useState<any>({
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

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <ShoppingCartContainer />
			case 1:
				return <PaymentInfoContainer />
			case 2:
				return <OrderConfirmation />
			default:
				return <ShoppingCartContainer />
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
				{getStepContent(orderStep)}
			</Box>
		</OrderContextProvider>
	)
}

export default Order
