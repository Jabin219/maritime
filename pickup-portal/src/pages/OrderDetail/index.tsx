import {
	DialogContentText,
	Box,
	Grid,
	Divider,
	Typography,
	Button,
	Dialog,
	DialogContent,
	DialogActions
} from '@mui/material'
import { OrderContext } from 'contexts/OrderContext'
import { TextContext } from 'contexts/TextContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { OrderDetailContainer } from './style'
import OrderStatusButton from 'components/OrderStatusButton'
import { Product } from 'models'
import { OrderStatus, ResponseStatus } from 'constants/index'
import { pickupOrder } from 'axios/order'
import { useNavigate } from 'react-router-dom'

const OrderDetail = () => {
	const navigate = useNavigate()
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
	const [dialogOpen, setDialogOpen] = useState(false)
	const confirmPickup = async (orderId: string) => {
		const result = await pickupOrder(orderId)
		if (result.data.status === ResponseStatus.SUCCESS) {
			navigate('/order-pickup-complete')
		}
	}
	const handleClickPickupButton = () => {
		if (selectedOrder.status === OrderStatus.paid) {
			confirmPickup(orderId as string)
		} else {
			setDialogOpen(true)
		}
	}
	const handleDialogClose = () => {
		setDialogOpen(false)
	}
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
							Pickup#:
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
				{selectedOrder.status !== OrderStatus.completed && (
					<Button
						variant='contained'
						className='btn-pickup'
						disabled={buttonDisabled}
						onClick={handleClickPickupButton}
					>
						Pick Up Order
					</Button>
				)}
				<Dialog open={dialogOpen} onClose={handleDialogClose}>
					<DialogContent>
						<DialogContentText sx={{ fontWeight: 700, color: '#333' }}>
							Are you sure the payment has been received and the products have
							been picked up?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose}>Cancel</Button>
						<Button
							variant='contained'
							onClick={() => {
								confirmPickup(orderId as string)
								handleDialogClose()
							}}
						>
							Confirm
						</Button>
					</DialogActions>
				</Dialog>
			</OrderDetailContainer>
		)
	)
}

export default OrderDetail
