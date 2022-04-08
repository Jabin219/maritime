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
							<FormControlLabel
								value='delivery'
								control={<Radio color='primary' />}
								label='Delivery Via Canada Post'
							/>
						</RadioGroup>
					</FormControl>
				</Box>
			</ShippingMethodContainer>
			{shippingMethod === 'delivery' && (
				<ShippingFormContainer>
					<Box className='shipping-form-container'>
						<Box className='header'>
							<Typography variant='h5'>Shipping Address</Typography>
							<Divider />
						</Box>
						<TextField label='Name' fullWidth size='small' />
						<TextField label='Address Line1' fullWidth size='small' />
						<TextField label='Address Line2' fullWidth size='small' />
						<Grid container spacing={3}>
							<Grid item xs>
								<TextField label='States' fullWidth size='small' />
							</Grid>
							<Grid item xs>
								<TextField label='City' fullWidth size='small' />
							</Grid>
							<Grid item xs>
								<TextField label='Zip Code' fullWidth size='small' />
							</Grid>
						</Grid>
						<TextField label='Email' fullWidth size='small' />
						<TextField label='Phone' fullWidth size='small' />
					</Box>
				</ShippingFormContainer>
			)}
		</>
	)
}

export default ShippingForm
