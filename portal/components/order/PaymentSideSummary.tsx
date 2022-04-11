import {
	Box,
	Typography,
	Divider,
	Grid,
	Button,
	CircularProgress
} from '@mui/material'
import { useContext, useState } from 'react'
import { OrderContext } from 'context/OrderContextProvider'
import { priceFormatter } from 'utils'
import { CartSideSummaryContainer } from 'styles/components/order'
import validator from 'validator'
import { createOrder } from 'api/order'
import { useStripe, useElements } from '@stripe/react-stripe-js'

interface Props {
	contactInformation: { name: String; email: String; phone: String }
	setContactFormError: (contactFormError: any) => void
	submitDisabled: Boolean
	CardElement: any
}

const PaymentSideSummary = ({
	contactInformation,
	setContactFormError,
	submitDisabled,
	CardElement
}: Props) => {
	const {
		order,
		setOrder,
		setOrderStep,
		contactFormError,
		shippingMethod,
		paymentMethod,
		clearCart,
		next
	} = useContext(OrderContext)
	const [processing, setProcessing] = useState(false)
	const stripe: any = useStripe()
	const elements: any = useElements()
	const handleSubmitOrder = async () => {
		// setProcessing(true)
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
		const createOrderResult: any = await createOrder({
			contactInformation,
			shippingMethod,
			paymentMethod,
			products: order.products
		})
		if (createOrderResult.data.status === 'success') {
			if (!stripe || !elements) {
				setProcessing(false)
				return
			}
			const payload = await stripe.confirmCardPayment(
				createOrderResult.data.intentSecret,
				{
					payment_method: {
						card: elements.getElement(CardElement) as any,
						billing_details: contactInformation
					}
				}
			)
			if (!payload || payload.error) {
				setProcessing(false)
			} else {
				if (
					payload.paymentIntent &&
					payload.paymentIntent.status === 'succeeded'
				) {
					clearCart()
					next()
				}
				setProcessing(false)
			}
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
			<Button
				className='btn-next-step'
				onClick={() => {
					handleSubmitOrder()
				}}
				disabled={
					processing || !stripe || !elements || submitDisabled ? true : false
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
