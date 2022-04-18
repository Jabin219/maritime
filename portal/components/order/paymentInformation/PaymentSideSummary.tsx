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
import { ProductContext } from 'context/ProductContextProvider'
import { ContactInformation, Product } from 'models'
import { SnackContext } from 'context/SnackContextProvider'
import { ResponseStatus, SnackType } from 'constant'

interface Props {
	contactInformation: { name: string; email: string; phone: string }
	setContactNameError: (name: boolean) => void
	setContactEmailError: (email: boolean) => void
	setContactPhoneError: (phone: boolean) => void
	submitDisabled: Boolean
}

const PaymentSideSummary = ({
	contactInformation,
	setContactNameError,
	setContactEmailError,
	setContactPhoneError,
	submitDisabled
}: Props) => {
	const { order, setOrder, shippingMethod, paymentMethod, clearCart, next } =
		useContext(OrderContext)
	const { showSnackbar } = useContext(SnackContext)
	const { setOrderStep, cart, setCart } = useContext(ProductContext)
	const [processing, setProcessing] = useState(false)
	const stripe: any = useStripe()
	const elements: any = useElements()
	const contactFormValidator = (contactInformation: ContactInformation) => {
		if (!contactInformation.name) {
			setContactNameError(true)
			return false
		}
		if (
			!contactInformation.email ||
			!validator.isEmail(contactInformation.email as string)
		) {
			setContactEmailError(true)
			return false
		}
		if (!contactInformation.phone) {
			setContactPhoneError(true)
			return false
		}
		return true
	}
	const handleSubmitOrder = async () => {
		const validatorResult = contactFormValidator(contactInformation)
		if (validatorResult) {
			setProcessing(true)
			const orderedProducts: { productId: string; quantity: number }[] = []
			order.products.forEach((product: Product) => {
				orderedProducts.push({
					productId: product._id,
					quantity: Number(product.quantity)
				})
			})
			const createdOrderResult: any = await createOrder(
				contactInformation,
				shippingMethod,
				paymentMethod,
				orderedProducts
			)
			if (createdOrderResult.data.status === ResponseStatus.OUT_OF_STOCK) {
				showSnackbar(SnackType.OUT_OF_STOCK)
				createdOrderResult.data.products.forEach((productId: string) => {
					cart.find(
						(cartProduct: Product) => cartProduct._id === productId
					).outOfStock = true
				})
				setCart(cart)
				setProcessing(false)
			} else if (createdOrderResult.data.status === ResponseStatus.SUCCESS) {
				setOrder({
					...order,
					contactInformation: contactInformation,
					shippingMethod: shippingMethod,
					paymentMethod: paymentMethod
				})
				clearCart()
				next()
			} else {
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