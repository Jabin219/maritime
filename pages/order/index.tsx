import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import OrderContextProvider from '../../context/OrderContextProvider'
import ShoppingCart from './ShoppingCart'

function Order() {
	const [orderStep, setOrderStep] = useState(0)
	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <ShoppingCart />
			case 1:
				return
			case 2:
				return
			case 3:
				return
			default:
				return <ShoppingCart />
		}
	}
	return (
		<OrderContextProvider>
			<Box className='order-process-container' sx={{ margin: '70px 40px' }}>
				<Grid container>
					<Grid item xs={orderStep !== 3 ? 8 : 12}>
						{getStepContent(orderStep)}
					</Grid>
					<Grid item xs></Grid>
				</Grid>
			</Box>
		</OrderContextProvider>
	)
}

export default Order
