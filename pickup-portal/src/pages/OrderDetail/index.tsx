import { Box, Grid, Divider, Typography, Button } from '@mui/material'
import { OrderContext } from 'contexts/OrderContext'
import { TextContext } from 'contexts/TextContext'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { OrderDetailContainer } from './style'
import OrderStatusButton from 'components/OrderStatusButton'
import { Product } from 'models'

const OrderDetail = () => {
	const { orderId } = useParams()
	const {
		findSelectedOrder,
		selectedOrder,
		getOrderStatusButtonContent,
		orderProducts,
		buttonDisabled
	} = useContext(OrderContext)
	const { setHeaderTitle } = useContext(TextContext)
	setHeaderTitle('Order Detail')
	useEffect(() => {
		findSelectedOrder(orderId)
	}, [orderId])

	return (
		selectedOrder && (
			<OrderDetailContainer>
				<Box className='order-info'>
					<Grid container spacing={2} className='order-info-container'>
						<Grid item className='order-info-label' sx={{ lineHeight: '28px' }}>
							Status:
						</Grid>
						<Grid item>
							<OrderStatusButton
								orderStatus={selectedOrder.status}
								content={getOrderStatusButtonContent(selectedOrder.status)}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2} className='order-info-container'>
						<Grid item className='order-info-label'>
							Pick Up#:
						</Grid>
						<Grid item>{selectedOrder.pickupNumber}</Grid>
					</Grid>
					<Grid container spacing={2} className='order-info-container'>
						<Grid item className='order-info-label'>
							Date:
						</Grid>
						<Grid item>
							{format(
								parseISO(selectedOrder.createdAt as any),
								'yyyy/MM/dd hh:mm'
							)}
						</Grid>
					</Grid>
					<Grid container spacing={2} className='order-info-container'>
						<Grid item className='order-info-label'>
							Name:
						</Grid>
						<Grid item>{selectedOrder.contactInformation.name}</Grid>
					</Grid>
					<Grid container spacing={2} className='order-info-container'>
						<Grid item className='order-info-label'>
							Email:
						</Grid>
						<Grid item>{selectedOrder.contactInformation.email}</Grid>
					</Grid>
					<Grid container spacing={2} className='order-info-container'>
						<Grid item className='order-info-label'>
							Phone#:
						</Grid>
						<Grid item>{selectedOrder.contactInformation.phone}</Grid>
					</Grid>
					<Grid container spacing={2} className='order-info-container'>
						<Grid item className='order-info-label'>
							Payment Method:
						</Grid>
						<Grid item>{selectedOrder.paymentMethod}</Grid>
					</Grid>
				</Box>
				<Divider />
				<Box className='order-products'>
					{orderProducts &&
						orderProducts.map((product: Product) => (
							<Box key={product._id}>
								<Grid container className='product-container'>
									<Grid item xs={3}>
										<img src={product.coverImage} alt={product.name} />
									</Grid>
									<Grid item xs={6}>
										<Typography>{product.name}</Typography>
										{product.outOfStock && (
											<Typography sx={{ color: '#FF0000' }}>
												Out of stock
											</Typography>
										)}
									</Grid>
									<Grid item xs={3}>
										<Typography className='product-price'>
											${product.price}
										</Typography>
										<Typography className='product-quantity'>
											x{product.quantity}
										</Typography>
									</Grid>
								</Grid>
								<Divider />
							</Box>
						))}
				</Box>
				<Box className='order-summary'>
					<Grid container className='order-summary-container'>
						<Grid item xs className='order-summary-label'>
							Subtotal:
						</Grid>
						<Grid item xs className='order-summary-price'>
							${selectedOrder.subtotal}
						</Grid>
					</Grid>
					<Grid container className='order-summary-container'>
						<Grid item xs className='order-summary-label'>
							Tax:
						</Grid>
						<Grid item xs className='order-summary-price'>
							${selectedOrder.tax}
						</Grid>
					</Grid>
					<Grid container className='order-summary-container'>
						<Grid item xs className='order-summary-label'>
							Total:
						</Grid>
						<Grid item xs className='order-summary-price'>
							${selectedOrder.total}
						</Grid>
					</Grid>
				</Box>
				<Button
					variant='contained'
					className='btn-pickup'
					disabled={buttonDisabled}
				>
					Pick Up Order
				</Button>
			</OrderDetailContainer>
		)
	)
}

export default OrderDetail
