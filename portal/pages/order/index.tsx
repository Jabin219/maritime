import { Box } from '@mui/material'
import { useContext, useState } from 'react'
import { ProductContext } from 'context/ProductContextProvider'
import { countCartTotal, saveCart } from 'utils/cartHandler'
import StripeElements from 'components/order/StripeElements'
import ShoppingCartContainer from 'components/order/ShoppingCartContainer'
import OrderContextProvider from 'context/OrderContextProvider'
import OrderConfirmation from 'components/order/OrderConfirmation'

const Order = () => {
	const [orderStep, setOrderStep] = useState(0)
	const [shippingMethod, setShippingMethod] = useState('pickup')
	const [paymentMethod, setPaymentMethod] = useState('credit-card')
	const { cart, setCart } = useContext(ProductContext)
	const [order, setOrder] = useState<any>({
		subtotal: countCartTotal(cart)
	})

	const clearCart = () => {
		setCart([])
		saveCart(cart)
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
				return <StripeElements />
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
