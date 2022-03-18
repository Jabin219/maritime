import { Box, Typography, Divider, Grid, Button } from '@mui/material'
import { useContext } from 'react'
import { OrderContext } from 'context/OrderContextProvider'
import CustomLink from 'components/customLink'
import { priceFormatter } from 'utils'
import { OrderSideSummaryContainer } from 'styles/pages/order'

function OrderSideSummary() {
	const { order, setOrderStep, orderStep } = useContext(OrderContext)
	const handleNextStep = () => {
		if (orderStep < 2) {
			setOrderStep(orderStep + 1)
		}
	}
	return (
		<OrderSideSummaryContainer className='order-side-summary'>
			<Box className='header'>
				<Typography variant='h5' className='title'>
					Summary
				</Typography>
			</Box>
			<Divider />
			<Grid className='summary' container>
				<Grid item xs={7} className='label'>
					<Typography variant='h6'>Subtotal</Typography>
				</Grid>
				<Grid item xs={5} className='rightFloat value'>
					<Typography>{priceFormatter(order.subtotal)}</Typography>
				</Grid>
				<Grid item xs={7} className='label'>
					<Typography variant='h6'>Tax</Typography>
				</Grid>
				<Grid className='rightFloat value' item xs={5}>
					<Typography>{order.tax ? order.tax : 'TBD'}</Typography>
				</Grid>
				<Grid item xs={7} className='label shipping-label'>
					<Typography variant='h6'>Shipping</Typography>
				</Grid>
				<Grid className='rightFloat value' item xs={5}>
					<Typography>
						{order.shippingFee ? order.shippingFee : 'TBD'}
					</Typography>
				</Grid>
				<Divider style={{ width: '100%' }} />
				<Grid item xs={7} className='label' style={{ marginTop: 20 }}>
					<Typography variant='h6' className='total'>
						Total
					</Typography>
				</Grid>
				<Grid
					className='rightFloat value'
					xs={5}
					item
					style={{ marginTop: 20 }}
				>
					<Typography className='total'>
						{order.total ? order.total : 'TBD'}
					</Typography>
				</Grid>
			</Grid>
			<Button
				className='btn-next-step'
				onClick={() => {
					handleNextStep()
				}}
			>
				Next Step
			</Button>
			<CustomLink href='/product-list'>Continue Shopping</CustomLink>
		</OrderSideSummaryContainer>
	)
}

export default OrderSideSummary
