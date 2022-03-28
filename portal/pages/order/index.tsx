import { Box, Grid } from '@mui/material'
import React from 'react'
import { useContext, useState } from 'react'
import { ProductContext } from 'context/ProductContextProvider'
import { countCartTotal } from 'utils/cartHandler'
import OrderSideSummary from 'components/order/OrderSideSummary'
import PaymentMethod from 'components/order/PaymentMethod'
import ShippingForm from 'components/order/ShippingForm'
import ShoppingCart from 'components/order/ShoppingCart'

import OrderContextProvider from 'context/OrderContextProvider'

const Order = () => {
	const [orderStep, setOrderStep] = useState(0)
	const { cart } = useContext(ProductContext)
	const [order, setOrder] = useState({
		subtotal: countCartTotal(cart)
	})
	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <ShoppingCart />
			case 1:
				return <ShippingForm />
			case 2:
				return <PaymentMethod />
			case 3:
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
				setOrder
			}}
		>
			<Box className='order-process-container' sx={{ margin: '70px 40px' }}>
				<Grid container spacing={5}>
					<Grid item xs={orderStep !== 3 ? 8 : 12}>
						{getStepContent(orderStep)}
					</Grid>
					{orderStep !== 3 && (
						<Grid item xs>
							<OrderSideSummary />
						</Grid>
					)}
				</Grid>
			</Box>
		</OrderContextProvider>
	)
}

export default Order
