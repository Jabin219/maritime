import { Box, Typography, CardContent, Grid } from '@mui/material'
import { FlexBox } from 'components/FlexBox'
import { OrderContext } from 'contexts/OrderContext'
import { Order, Product } from 'models'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { OrderCard } from './style'
import { TextContext } from 'contexts/TextContext'
import { useNavigate } from 'react-router-dom'
import OrderStatusButton from 'components/OrderStatusButton'
import { OrderStatus } from 'constants/index'
import { checkOrderStock } from 'axios/order'

const OrderSearchResult = () => {
	const navigate = useNavigate()
	const { orders, getOrderStatusButtonContent, setButtonDisabled } =
		useContext(OrderContext)
	const { setHeaderTitle } = useContext(TextContext)
	setHeaderTitle('Search Result')
	const checkStock = async (order: Order) => {
		const stockResult = (await checkOrderStock(order._id as string)).data
		stockResult.products.forEach((product: Product) => {
			if (product.outOfStock) {
				setButtonDisabled(true)
			}
		})
		order.products = JSON.stringify(stockResult.products)
	}

	return (
		<Box
			sx={{ backgroundColor: '#f5f5f5', paddingTop: '5px', minHeight: '100vh' }}
		>
			{orders && orders.length > 0 ? (
				orders.map((order: Order) => {
					return (
						<OrderCard
							key={order._id}
							onClick={() => {
								setButtonDisabled(false)
								if (order.status === OrderStatus.expired) {
									checkStock(order)
								}
								navigate(`/order-detail/${order._id}`)
							}}
						>
							<CardContent>
								<Box sx={{ float: 'right' }}>
									<OrderStatusButton
										orderStatus={order.status as string}
										content={getOrderStatusButtonContent(order.status)}
									/>
								</Box>
								<Typography
									className='order-information-label'
									sx={{
										fontFamily: 'Inter',
										fontWeight: 600,
										color: '#adadad',
										marginBottom: '10px',
										lineHeight: '28px'
									}}
								>
									{format(parseISO(order.createdAt as any), 'yyyy/MM/dd hh:mm')}
								</Typography>
								<Grid container className='order-information-container'>
									<Grid item xs={4} className='order-information-label'>
										Pick up#
									</Grid>
									<Grid item xs>
										{order.pickupNumber}
									</Grid>
								</Grid>
								<Grid container className='order-information-container'>
									<Grid item xs={4} className='order-information-label'>
										Name
									</Grid>
									<Grid item xs>
										{order.contactInformation?.name}
									</Grid>
								</Grid>
								<Grid container className='order-information-container'>
									<Grid item xs={4} className='order-information-label'>
										Phone
									</Grid>
									<Grid item xs>
										{order.contactInformation?.phone}
									</Grid>
								</Grid>
								<Grid container className='order-information-container'>
									<Grid item xs={4} className='order-information-label'>
										Email
									</Grid>
									<Grid item xs>
										{order.contactInformation?.email}
									</Grid>
								</Grid>
								<Grid container className='order-information-container'>
									<Grid item xs={4} className='order-information-label'>
										Amount
									</Grid>
									<Grid item xs>
										{order.total}
									</Grid>
								</Grid>
							</CardContent>
						</OrderCard>
					)
				})
			) : (
				<FlexBox sx={{ marginTop: '80px' }}>
					<Typography sx={{ marginBottom: '10px' }}>
						No Matching Result Found
					</Typography>
					<Link
						to='/order-search'
						style={{
							fontSize: 14,
							fontWeight: 700,
							color: '#2E65F3',
							textDecoration: 'underline'
						}}
					>
						Back
					</Link>
				</FlexBox>
			)}
		</Box>
	)
}

export default OrderSearchResult
