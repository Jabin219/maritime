import { getOptionGroupUnstyledUtilityClass } from '@mui/base'
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
import { useState } from 'react'
import {
	BillingAddressContainer,
	PaymentMethodContainer
} from 'styles/pages/order'

const PaymentMethod = () => {
	const [paymentMethod, setPaymentMethod] = useState('credit-card')
	const [billingAddressRadio, setBillingAddressRadio] =
		useState('same-as-shipping')
	const handleChangePaymentMethod = (event: any) => {
		setPaymentMethod(event.target.value)
	}
	const handleChangeBillingAddressRadio = (event: any) => {
		setBillingAddressRadio(event.target.value)
	}
	return (
		<>
			<PaymentMethodContainer>
				<Box className='payment-method-container'>
					<Box className='header'>
						<Typography variant='h5'>Shipping Method</Typography>
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
			<BillingAddressContainer>
				<Box className='billing-address'>
					<Box className='header'>
						<Typography variant='h5'>Billing Address</Typography>
						<Divider />
					</Box>
					<FormControl>
						<RadioGroup
							defaultValue={billingAddressRadio}
							onChange={handleChangeBillingAddressRadio}
						>
							<FormControlLabel
								value='same-as-shipping'
								control={<Radio color='primary' />}
								label='Same as shipping address'
							/>
							<FormControlLabel
								value='use-different'
								control={<Radio color='primary' />}
								label='Use a different billing address'
							/>
						</RadioGroup>
					</FormControl>
				</Box>
			</BillingAddressContainer>
		</>
	)
}

export default PaymentMethod
