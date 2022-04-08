import {
	Box,
	Typography,
	Divider,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	Grid
} from '@mui/material'
import { OrderContext } from 'context/OrderContextProvider'
import { useContext, useReducer, useState } from 'react'
import {
	PaymentMethodContainer,
	PaymentInfoContainer,
	ShippingMethodContainer,
	ContactFormContainer
} from 'styles/pages/order'
import PaymentSideSummary from './PaymentSideSummary'
import { CardElement } from '@stripe/react-stripe-js'
const initialContactInformation = { name: '', email: '', phone: '' }
const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'change-name':
			return { ...state, name: action.value }
		case 'change-email':
			return { ...state, email: action.value }
		case 'change-phone':
			return { ...state, phone: action.value }
		default:
			throw new Error()
	}
}
const PaymentInformation = () => {
	const [contactFormError, setContactFormError] = useState({
		name: false,
		email: false,
		phone: false
	})
	const [contactInformation, dispatch] = useReducer(
		reducer,
		initialContactInformation
	)
	const { setShippingMethod, setPaymentMethod, shippingMethod, paymentMethod } =
		useContext(OrderContext)
	const handleChangeShippingMethod = (event: any) => {
		setShippingMethod(event.target.value)
	}
	const handleChangePaymentMethod = (event: any) => {
		setPaymentMethod(event.target.value)
	}
	const [submitDisabled, setSubmitDisabled] = useState(false)
	const [cardInputError, setCardInputError] = useState<string | null>(null)
	const handleCardChange = (event: any) => {
		setSubmitDisabled(event.empty)
		setCardInputError(event.error ? event.error.message : '')
	}

	return (
		<Grid container spacing={10}>
			<Grid item xs={8}>
				<PaymentInfoContainer>
					<ContactFormContainer>
						<Box className='contact-form-container'>
							<Box className='header'>
								<Typography variant='h5'>Contact Information</Typography>
								<Divider />
							</Box>
							<TextField
								label='Name'
								fullWidth
								error={contactFormError.name}
								helperText={
									contactFormError.name ? 'Please enter your full name' : ''
								}
								required
								onChange={event => {
									dispatch({
										type: 'change-name',
										value: event.target.value
									})
									setContactFormError({ ...contactFormError, name: false })
								}}
							/>
							<TextField
								label='Email'
								fullWidth
								error={contactFormError.email}
								helperText={
									contactFormError.email
										? 'Please enter a valid email address'
										: ''
								}
								required
								onChange={event => {
									dispatch({
										type: 'change-email',
										value: event.target.value
									})
									setContactFormError({ ...contactFormError, email: false })
								}}
							/>
							<TextField
								label='Phone Number'
								fullWidth
								error={contactFormError.phone}
								helperText={
									contactFormError.phone
										? 'Please enter a valid phone number'
										: ''
								}
								required
								onChange={event => {
									dispatch({
										type: 'change-phone',
										value: event.target.value
									})
									setContactFormError({ ...contactFormError, phone: false })
								}}
							/>
						</Box>
					</ContactFormContainer>
					<ShippingMethodContainer>
						<Box className='shipping-method-container'>
							<Box className='header'>
								<Typography variant='h5'>Shipping Method</Typography>
								<Divider />
							</Box>
							<FormControl>
								<RadioGroup
									defaultValue={shippingMethod}
									onChange={handleChangeShippingMethod}
								>
									<FormControlLabel
										value='pickup'
										control={<Radio color='primary' />}
										label='Pick Up'
									/>
								</RadioGroup>
							</FormControl>
						</Box>
					</ShippingMethodContainer>
					<PaymentMethodContainer>
						<Box className='payment-method-container'>
							<Box className='header'>
								<Typography variant='h5'>Payment Method</Typography>
								<Divider />
							</Box>
							<FormControl>
								<RadioGroup
									defaultValue={paymentMethod}
									onChange={handleChangePaymentMethod}
								>
									<FormControlLabel
										value='credit-card'
										control={<Radio color='primary' />}
										label='Credit Card'
									/>
								</RadioGroup>
							</FormControl>
						</Box>
						{paymentMethod === 'credit-card' && (
							<Box className='credit-info'>
								<Box className='header'>
									<Typography variant='h5'>Credit Card Info</Typography>
									<Divider />
								</Box>
								<CardElement
									options={{ hidePostalCode: true }}
									onChange={handleCardChange}
								/>
							</Box>
						)}
					</PaymentMethodContainer>
				</PaymentInfoContainer>
			</Grid>
			<Grid item xs>
				<PaymentSideSummary
					contactInformation={contactInformation}
					setContactFormError={setContactFormError}
					submitDisabled={submitDisabled}
					CardElement={CardElement}
				/>
			</Grid>
		</Grid>
	)
}
export default PaymentInformation
