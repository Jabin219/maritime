import {
	Box,
	Typography,
	Grid,
	Divider,
	Table,
	TableHead,
	TableBody,
	TableCell
} from '@mui/material'
import { OrderContext } from 'context/OrderContextProvider'
import { useContext } from 'react'
import Image from 'next/image'
import {
	OrderConfirmationContainer,
	OrderConfirmationTopBox,
	OrderInformationContainer
} from 'styles/components/order'
import { PaymentMethod } from 'constant'
import { format, parseISO } from 'date-fns'
import { priceFormatter } from 'utils'
import { Product } from 'models'

const OrderConfirmation = () => {
	const { order } = useContext(OrderContext)
	const { contactInformation, products } = order
	return (
		<OrderConfirmationContainer>
			<OrderConfirmationTopBox>
				<Typography variant='h2' sx={{ marginBottom: '35px' }}>
					Thank You !
				</Typography>
				<Box sx={{ marginBottom: '40px' }}>
					<Image
						src='/images/order/order-confirmation-icon.png'
						alt='confirmation-order'
						width={100}
						height={100}
					/>
				</Box>
				<Typography>Your order is completed.</Typography>
				<Typography>A conformation has been sent to your e-mail.</Typography>
			</OrderConfirmationTopBox>
			<OrderInformationContainer>
				<Box sx={{ margin: '50px' }}>
					<Box className='pick-up-information'>
						<Grid container>
							<Grid item xs>
								<Typography
									variant='h6'
									className='pick-up-information-subtitle'
								>
									Pick Up Number
								</Typography>
								<Typography variant='h6' className='pick-up-information-detail'>
									{order.pickupNumber}
								</Typography>
							</Grid>
							<Grid item xs>
								<Typography
									variant='h6'
									className='pick-up-information-subtitle'
								>
									Store Location
								</Typography>
								<Typography variant='h6' className='pick-up-information-detail'>
									50 Tacoma Dr, Dartmouth
								</Typography>
							</Grid>
							{order.paymentMethod === PaymentMethod.payAtPickup && (
								<Grid item xs>
									<Typography
										variant='h6'
										className='pick-up-information-subtitle'
									>
										Items will be Reserved for
									</Typography>
									<Typography
										variant='h6'
										className='pick-up-information-detail'
									>
										3 days
									</Typography>
								</Grid>
							)}
						</Grid>
					</Box>
					<Box className='order-detail-container'>
						<Typography variant='h6' sx={{ marginBottom: '10px' }}>
							Order Detail
						</Typography>
						<Divider />
						<Box className='order-detail'>
							<Grid container>
								<Grid item xs>
									<Box className='single-information-container'>
										<Typography component='label'>Pick Up#: </Typography>
										<Typography component='span'>
											{order.pickupNumber}
										</Typography>
									</Box>
									<Box className='single-information-container'>
										<Typography component='label'>Date: </Typography>
										<Typography component='span'>
											{format(parseISO(order.createdAt), 'yyyy/MM/dd')}
										</Typography>
									</Box>
									<Box className='single-information-container'>
										<Typography component='label'>Email: </Typography>
										<Typography component='span'>
											{contactInformation.email}
										</Typography>
									</Box>
									<Box className='single-information-container'>
										<Typography component='label'>Phone#: </Typography>
										<Typography component='span'>
											{contactInformation.phone}
										</Typography>
									</Box>
								</Grid>
								<Grid item xs>
									<Box className='single-information-container'>
										<Typography component='label'>Shipping Method: </Typography>
										<Typography component='span'>Pick Up</Typography>
									</Box>
									<Box className='single-information-container'>
										<Typography component='label'>Payment Method: </Typography>
										<Typography component='span'>
											{order.paymentMethod === PaymentMethod.payAtPickup &&
												'Pay At Pickup'}
											{order.paymentMethod === PaymentMethod.creditCard &&
												'Credit Card'}
										</Typography>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Box>
					<Box className='order-items-container'>
						<Table>
							<TableHead>
								<TableCell>Item</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>Qty</TableCell>
								<TableCell>Subtotal</TableCell>
							</TableHead>
							{products.map((product: Product) => (
								<TableBody key={product._id}>
									<TableCell>{product.name}</TableCell>
									<TableCell>
										${priceFormatter(Number(product.price))}
									</TableCell>
									<TableCell>{product.quantity}</TableCell>
									<TableCell>
										$
										{priceFormatter(
											Number(product.price) * Number(product.quantity)
										)}
									</TableCell>
								</TableBody>
							))}
						</Table>
						<Box className='price-summary'>
							<Box className='single-price-summary-container'>
								<Typography component='label'>Subtotal:</Typography>
								<Typography component='span'>
									${priceFormatter(order.subtotal)}
								</Typography>
							</Box>
							<Box className='single-price-summary-container'>
								<Typography component='label'>Taxes:</Typography>
								<Typography component='span'>
									${priceFormatter(order.tax)}
								</Typography>
							</Box>
							<Box className='single-price-summary-container'>
								<Typography component='label'>Total:</Typography>
								<Typography component='span'>
									${priceFormatter(order.total)}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</OrderInformationContainer>
		</OrderConfirmationContainer>
	)
}

export default OrderConfirmation
