import { Box, Typography, Divider, Grid, Button } from '@mui/material'
import { useContext } from 'react'
import { OrderContext } from 'context/OrderContextProvider'
import CustomLink from 'components/customLink'
import { priceFormatter, taxCalculator } from 'utils'
import { OrderSideSummaryContainer } from 'styles/pages/order'
import { Categories } from 'constant'
import { ProductContext } from 'context/ProductContextProvider'
import validator from 'validator'
import { createOrder } from 'api/order'

interface Props {
	contactInformation: { name: String; email: String; phone: String }
}

const OrderSideSummary = ({ contactInformation }: Props) => {
	const { setCategory, cart } = useContext(ProductContext)
	const {
		order,
		setOrderStep,
		orderStep,
		setOrder,
		contactFormError,
		setContactFormError,
		shippingMethod,
		paymentMethod
	} = useContext(OrderContext)
	const handleNextStep = () => {
		if (orderStep < 2) {
			setOrderStep(orderStep + 1)
		}
	}
	const handleShoppingCartNext = () => {
		setOrder({
			...order,
			tax: priceFormatter(taxCalculator(order.subtotal)),
			total: priceFormatter(order.subtotal + taxCalculator(order.subtotal)),
			products: cart
		})
		handleNextStep()
	}
	const handleSubmitOrder = () => {
		if (!contactInformation.name) {
			setContactFormError({ ...contactFormError, name: true })
			return
		}
		if (
			!contactInformation.email ||
			!validator.isEmail(contactInformation.email as string)
		) {
			setContactFormError({ ...contactFormError, email: true })
			return
		}
		if (!contactInformation.phone) {
			setContactFormError({ ...contactFormError, phone: true })
			return
		}
		setOrder({
			...order,
			contactInformation: contactInformation,
			shippingMethod: shippingMethod,
			paymentMethod: paymentMethod
		})
		createOrder({
			contactInformation,
			shippingMethod,
			paymentMethod,
			products: order.products
		})
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
			{orderStep === 0 && (
				<Button
					className='btn-next-step'
					onClick={() => {
						handleShoppingCartNext()
					}}
				>
					Next Step
				</Button>
			)}
			{orderStep === 1 && (
				<Button
					className='btn-next-step'
					onClick={() => {
						handleSubmitOrder()
					}}
				>
					Place Order
				</Button>
			)}
			<CustomLink href='/product-list'>
				<Typography
					onClick={() => {
						setCategory(Categories[0])
					}}
				>
					Continue Shopping
				</Typography>
			</CustomLink>
		</OrderSideSummaryContainer>
	)
}

export default OrderSideSummary
