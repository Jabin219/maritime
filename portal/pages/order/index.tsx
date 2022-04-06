import { Box, Grid } from '@mui/material'
import React, { useReducer } from 'react'
import { useContext, useState } from 'react'
import { ProductContext } from 'context/ProductContextProvider'
import { countCartTotal } from 'utils/cartHandler'
import OrderSideSummary from 'components/order/OrderSideSummary'
import PaymentInformation from 'components/order/PaymentInformation'
import ShoppingCart from 'components/order/ShoppingCart'
import OrderContextProvider from 'context/OrderContextProvider'

const initialContactInformation = { name: '', email: '', phone: '' }
const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'change-name':
			return { ...state, name: action.value }
		case 'change-email':
			return { ...state, email: action.value }
		case 'change-phone':
			return { ...state, phone: action.value }
		default:
			throw new Error()
	}
}

const Order = () => {
	const [orderStep, setOrderStep] = useState(0)
	const [contactFormError, setContactFormError] = useState({
		name: false,
		email: false,
		phone: false
	})
	const [shippingMethod, setShippingMethod] = useState('pickup')
	const [paymentMethod, setPaymentMethod] = useState('credit-card')
	const { cart } = useContext(ProductContext)
	const [order, setOrder] = useState<any>({
		subtotal: countCartTotal(cart)
	})
	const [contactInformation, dispatch] = useReducer(
		reducer,
		initialContactInformation
	)

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <ShoppingCart />
			case 1:
				return (
					<PaymentInformation updateContactInformationDispatch={dispatch} />
				)
			case 2:
				return
			default:
				return <ShoppingCart />
		}
	}
	return (
		<OrderContextProvider
			value={{
				orderStep,
				setOrderStep,
				order,
				setOrder,
				contactFormError,
				setContactFormError,
				setShippingMethod,
				setPaymentMethod,
				shippingMethod,
				paymentMethod
			}}
		>
			<Box className='order-process-container' sx={{ margin: '70px 40px' }}>
				<Grid container spacing={5}>
					<Grid item xs={orderStep !== 3 ? 8 : 12}>
						{getStepContent(orderStep)}
					</Grid>
					{orderStep !== 3 && (
						<Grid item xs>
							<OrderSideSummary contactInformation={contactInformation} />
						</Grid>
					)}
				</Grid>
			</Box>
		</OrderContextProvider>
	)
}

export default Order
