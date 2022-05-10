import { Typography } from '@mui/material'
import { FlexBox } from 'components/FlexBox'
import React from 'react'
import { Link } from 'react-router-dom'

const OrderPickupComplete = () => {
	return (
		<FlexBox sx={{ paddingTop: '100px' }}>
			<Typography variant='h6' sx={{ fontWeight: 700, marginBottom: '30px' }}>
				Order Completed
			</Typography>
			<Link
				to='/order-search-result'
				style={{
					fontSize: 14,
					fontWeight: 700,
					color: '#2E65F3',
					textDecoration: 'underline'
				}}
			>
				Back to Orders
			</Link>
		</FlexBox>
	)
}

export default OrderPickupComplete
