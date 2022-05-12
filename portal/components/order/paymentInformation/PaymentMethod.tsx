import {
	Box,
	Typography,
	Divider,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio
} from '@mui/material'
import { PaymentMethod } from 'constant'
import React from 'react'
import { PaymentMethodContainer } from 'styles/components/order'

interface Props {
	paymentMethod: string
	handleChangePaymentMethod: (event: any) => void
	CardElement: any
	handleCardChange: (event: any) => void
	cardInputError: string
}

const PaymentMethodComponent = ({
	paymentMethod,
	handleChangePaymentMethod,
	CardElement,
	handleCardChange,
	cardInputError
}: any) => {
	return (
		<PaymentMethodContainer>
			<Box className='payment-method-container'>
				<Box className='header'>
					<Typography variant='h5'>Payment Method</Typography>
					<Divider />
				</Box>
				<FormControl>
					<RadioGroup
						value={paymentMethod}
						onChange={handleChangePaymentMethod}
					>
						<FormControlLabel
							value={PaymentMethod.creditCard}
							control={<Radio color='primary' />}
							label='Credit Card'
						/>
						<FormControlLabel
							value={PaymentMethod.payAtPickup}
							control={<Radio color='primary' />}
							label='Pay upon at pickup (reserve for 3 days)'
						/>
					</RadioGroup>
				</FormControl>
			</Box>
			{paymentMethod === PaymentMethod.creditCard && (
				<Box className='credit-info'>
					<Box className='header'>
						<Typography variant='h5'>Credit Card Info</Typography>
						<Divider />
					</Box>
					<CardElement
						options={{ hidePostalCode: true }}
						onChange={handleCardChange}
					/>
					{cardInputError && (
						<Typography className='stripe_card-error' role='alert'>
							{cardInputError}
						</Typography>
					)}
				</Box>
			)}
		</PaymentMethodContainer>
	)
}

export default PaymentMethodComponent
