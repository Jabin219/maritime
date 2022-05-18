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
	PaymentInfoContainer,
	ShippingMethodContainer,
	ContactFormContainer
} from 'styles/components/order'
import PaymentSideSummary from './PaymentSideSummary'
import { CardElement } from '@stripe/react-stripe-js'
import { getContactInformation } from './paymentHandler'
import PaymentMethodComponent from './PaymentMethod'
const initialContactInformation = {
	name: '',
	email: '',
	phone: ''
}
const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'CHANGE_NAME':
			return { ...state, name: action.value }
		case 'CHANGE_EMAIL':
			return { ...state, email: action.value }
		case 'CHANGE_PHONE':
			return { ...state, phone: action.value }
		default:
			throw new Error()
	}
}
const PaymentInformation = () => {
	const [contactNameError, setContactNameError] = useState(false)
	const [contactEmailError, setContactEmailError] = useState(false)
	const [contactPhoneError, setContactPhoneError] = useState(false)
	const [contactInformation, dispatch] = useReducer(
		reducer,
		getContactInformation() || initialContactInformation
	)
	const { setShippingMethod, setPaymentMethod, shippingMethod, paymentMethod } =
		useContext(OrderContext)
	const handleChangeShippingMethod = (event: any) => {
		setShippingMethod(event.target.value)
	}
	const handleChangePaymentMethod = (event: any) => {
		setPaymentMethod(event.target.value)
	}
	const [submitDisabled, setSubmitDisabled] = useState(true)
	const [cardInputError, setCardInputError] = useState<string>('')
	const handleCardChange = (event: any) => {
		setSubmitDisabled(event.empty)
		setCardInputError(
			event.error ? `Payment error: ${event.error.message}` : ''
		)
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
								error={contactNameError}
								helperText={
									contactNameError ? 'Please enter your full name' : ''
								}
								required
								value={contactInformation.name}
								onChange={event => {
									dispatch({
										type: 'CHANGE_NAME',
										value: event.target.value
									})
									setContactNameError(false)
								}}
							/>
							<TextField
								label='Email'
								fullWidth
								error={contactEmailError}
								helperText={
									contactEmailError ? 'Please enter a valid email address' : ''
								}
								required
								value={contactInformation.email}
								onChange={event => {
									dispatch({
										type: 'CHANGE_EMAIL',
										value: event.target.value
									})
									setContactEmailError(false)
								}}
							/>
							<TextField
								label='Phone Number'
								fullWidth
								error={contactPhoneError}
								helperText={
									contactPhoneError ? 'Please enter a valid phone number' : ''
								}
								required
								value={contactInformation.phone}
								onChange={event => {
									dispatch({
										type: 'CHANGE_PHONE',
										value: event.target.value
									})
									setContactPhoneError(false)
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
										label='In-store Pickup'
									/>
								</RadioGroup>
							</FormControl>
						</Box>
					</ShippingMethodContainer>
					<PaymentMethodComponent
						paymentMethod={paymentMethod}
						handleChangePaymentMethod={handleChangePaymentMethod}
						CardElement={CardElement}
						handleCardChange={handleCardChange}
						cardInputError={cardInputError}
					/>
				</PaymentInfoContainer>
			</Grid>
			<Grid item xs>
				<PaymentSideSummary
					contactInformation={contactInformation}
					setContactNameError={setContactNameError}
					setContactEmailError={setContactEmailError}
					setContactPhoneError={setContactPhoneError}
					submitDisabled={submitDisabled}
					CardElement={CardElement}
					cardInputError={cardInputError}
					setCardInputError={setCardInputError}
				/>
			</Grid>
		</Grid>
	)
}
export default PaymentInformation
