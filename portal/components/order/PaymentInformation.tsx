import {
	Box,
	Typography,
	Divider,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField
} from '@mui/material'
import { OrderContext } from 'context/OrderContextProvider'
import { useContext } from 'react'
import {
	PaymentMethodContainer,
	PaymentInfoContainer,
	ShippingMethodContainer,
	ContactFormContainer
} from 'styles/pages/order'

interface Props {
	updateContactInformationDispatch: any
}

const PaymentInformation = ({ updateContactInformationDispatch }: Props) => {
	const {
		contactFormError,
		setContactFormError,
		setShippingMethod,
		setPaymentMethod,
		shippingMethod,
		paymentMethod
	} = useContext(OrderContext)
	const handleChangeShippingMethod = (event: any) => {
		setShippingMethod(event.target.value)
	}
	const handleChangePaymentMethod = (event: any) => {
		setPaymentMethod(event.target.value)
	}

	return (
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
							updateContactInformationDispatch({
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
							contactFormError.email ? 'Please enter a valid email address' : ''
						}
						required
						onChange={event => {
							updateContactInformationDispatch({
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
							contactFormError.phone ? 'Please enter a valid phone number' : ''
						}
						required
						onChange={event => {
							updateContactInformationDispatch({
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
						<TextField label='Credit Card Number' fullWidth size='small' />
					</Box>
				)}
			</PaymentMethodContainer>
		</PaymentInfoContainer>
	)
}

export default PaymentInformation
