import {
	Box,
	Divider,
	FormControl,
	Grid,
	TextField,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio
} from '@mui/material'
import { useState } from 'react'
import {
	ShippingMethodContainer,
	ShippingFormContainer
} from 'styles/pages/order'

const ShippingForm = () => {
	const [shippingMethod, setShippingMethod] = useState('pickup')
	const handleChangeShippingMethod = (event: any) => {
		setShippingMethod(event.target.value)
	}
	return (
		<>
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
			<ShippingFormContainer>
				<Box className='shipping-form-container'>
					<Box className='header'>
						<Typography variant='h5'>Contact Information</Typography>
						<Divider />
					</Box>
					<TextField label='Name' fullWidth size='small' />
					<TextField label='Email' fullWidth size='small' />
					<TextField label='Phone Number' fullWidth size='small' />
				</Box>
			</ShippingFormContainer>
		</>
	)
}

export default ShippingForm
