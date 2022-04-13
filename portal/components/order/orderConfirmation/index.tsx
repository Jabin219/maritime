import { Box, Typography } from '@mui/material'
import { OrderContext } from 'context/OrderContextProvider'
import { useContext } from 'react'
import { OrderConfirmationContainer } from 'styles/components/order'

const OrderConfirmation = () => {
	const { order } = useContext(OrderContext)
	return (
		<OrderConfirmationContainer>
			<Box className='confirmation-top-box'>
				<Typography>Thank You !</Typography>
			</Box>
		</OrderConfirmationContainer>
	)
}

export default OrderConfirmation
