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
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { ProductContext } from 'context/ProductContextProvider'
import { SnackContext } from 'context/SnackContextProvider'
import { PaymentMethod } from 'constant'
import { handleSubmitOrder } from './paymentHandler'
interface Props {
	contactInformation: { name: string; email: string; phone: string }
	setContactNameError: (name: boolean) => void
	setContactEmailError: (email: boolean) => void
	setContactPhoneError: (phone: boolean) => void
	submitDisabled: boolean
	CardElement: any
	cardInputError: string
	setCardInputError: (errorMessage: string) => void
}
const PaymentSideSummary = ({
	contactInformation,
	setContactNameError,
	setContactEmailError,
	setContactPhoneError,
	submitDisabled,
	CardElement,
	cardInputError,
	setCardInputError
}: Props) => {
	const { order, setOrder, shippingMethod, paymentMethod, clearCart, next } =
		useContext(OrderContext)
	const { showSnackbar } = useContext(SnackContext)
	const { setOrderStep, cart, setCart } = useContext(ProductContext)
	const [processing, setProcessing] = useState(false)
	const stripe: any = useStripe()
	const elements: any = useElements()
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
					<Typography>{priceFormatter(order.tax)}</Typography>
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
						{priceFormatter(order.total)}
					</Typography>
				</Grid>
			</Grid>
			<Button
				className='btn-next-step'
				onClick={() => {
					handleSubmitOrder(
						contactInformation,
						setContactNameError,
						setContactEmailError,
						setContactPhoneError,
						setProcessing,
						order,
						shippingMethod,
						paymentMethod,
						showSnackbar,
						cart,
						setCart,
						stripe,
						elements,
						CardElement,
						setCardInputError,
						setOrder,
						clearCart,
						next
					)
				}}
				disabled={
					(paymentMethod === PaymentMethod.creditCard &&
						(!stripe || submitDisabled || Boolean(cardInputError))) ||
					processing
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
