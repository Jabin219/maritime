import { Box, Grid } from '@mui/material'
import React from 'react'
import { useContext, useState } from 'react'
import { ProductContext } from '../../context/ProductContextProvider'
import { countCartTotal } from '../../utils/cartHandler'
import OrderSideSummary from './OrderSideSummary'
import PaymentMethod from './PaymentMethod'
import ShippingForm from './ShippingForm'
import ShoppingCart from './ShoppingCart'

export const OrderContext = React.createContext<any>(null)

function Order() {
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
		<OrderContext.Provider
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
		</OrderContext.Provider>
	)
}

export default Order
