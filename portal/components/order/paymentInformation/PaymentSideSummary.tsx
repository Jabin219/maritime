import {
	Box,
	Typography,
	Divider,
	Grid,
	Button,
	CircularProgress
} from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import { OrderContext } from 'context/OrderContextProvider'
import { priceFormatter } from 'utils'
import { CartSideSummaryContainer } from 'styles/components/order'
import validator from 'validator'
import { createOrder } from 'api/order'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { ProductContext } from 'context/ProductContextProvider'
import { Product } from 'models'
import { SnackContext } from 'context/SnackContextProvider'
import { PaymentMethod } from 'constant'

interface Props {
	contactInformation: { name: string; email: string; phone: string }
	setContactFormError: (contactFormError: any) => void
	submitDisabled: Boolean
	CardElement: any
	setCardInputError: (errorMessage: string) => void
}

const PaymentSideSummary = ({
	contactInformation,
	setContactFormError,
	submitDisabled,
	CardElement,
	setCardInputError
}: Props) => {
	const {
		order,
		setOrder,
		contactFormError,
		shippingMethod,
		paymentMethod,
		clearCart,
		next
	} = useContext(OrderContext)
	const { showSnackbar } = useContext(SnackContext)
	const { setOrderStep, cart, setCart } = useContext(ProductContext)
	const [processing, setProcessing] = useState(false)
	const stripe: any = useStripe()
	const elements: any = useElements()

	const handleSubmitOrder = async () => {
		setProcessing(true)
		if (!contactInformation.name) {
			setContactFormError({ ...contactFormError, name: true })
			setProcessing(false)
			return
		}
		if (
			!contactInformation.email ||
			!validator.isEmail(contactInformation.email as string)
		) {
			setContactFormError({ ...contactFormError, email: true })
			setProcessing(false)
			return
		}
		if (!contactInformation.phone) {
			setContactFormError({ ...contactFormError, phone: true })
			setProcessing(false)
			return
		}
		const orderResult: any = await createOrder(
			contactInformation,
			shippingMethod,
			paymentMethod,
			cart
		)
		if (!orderResult) {
			setProcessing(false)
			return
		}
		if (orderResult.data.status === 'out-of-stock') {
			showSnackbar('out-of-stock')
			orderResult.data.products.forEach((productId: string) => {
				cart.find(
					(cartProduct: Product) => cartProduct._id === productId
				).outOfStock = true
			})
			setCart(cart)
			setProcessing(false)
			return
		}
		if (orderResult.data.status === 'success') {
			if (paymentMethod === PaymentMethod.creditCard) {
				if (!stripe || !elements) {
					setProcessing(false)
					return
				}
				const cardInformation = elements.getElement(CardElement) as any
				const payload = await stripe.confirmCardPayment(
					orderResult.data.intentSecret,
					{
						payment_method: {
							card: cardInformation,
							billing_details: contactInformation
						}
					}
				)
				if (payload.error) {
					setCardInputError(`Payment error: ${payload.error.message}`)
					setProcessing(false)
					return
				}
			}
			setCardInputError('')
			setOrder(orderResult.data.order)
			// clearCart()
			setProcessing(false)
			next()
		}
	}
	return (
		<CartSideSummaryContainer className='cart-side-summary'>
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
					<Typography>{order.tax}</Typography>
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
					<Typography className='total'>{order.total}</Typography>
				</Grid>
			</Grid>
			<Button
				className='btn-next-step'
				onClick={() => {
					handleSubmitOrder()
				}}
				disabled={
					(paymentMethod === PaymentMethod.creditCard &&
						(!stripe || submitDisabled)) ||
					processing
						? true
						: false
				}
			>
				Place Order
				{processing && (
					<CircularProgress
						style={{ position: 'absolute', color: '#fff' }}
						size={24}
					/>
				)}
			</Button>
			<Typography
				onClick={() => {
					setOrderStep(0)
				}}
				sx={{ cursor: 'pointer' }}
			>
				Back To Cart
			</Typography>
		</CartSideSummaryContainer>
	)
}

export default PaymentSideSummary
