import { Typography } from '@mui/material'
import { FlexBox } from 'components/FlexBox'
import React from 'react'
import { Link } from 'react-router-dom'

const AddProductComplete = () => {
	return (
		<FlexBox
			sx={{
				paddingTop: '100px',
				width: '44%',
				margin: '0 auto'
			}}
		>
			<Typography variant='h6' sx={{ fontWeight: 700, marginBottom: '20px' }}>
				Products has been added successfully
			</Typography>
			<Link
				to='/add-new-product'
				style={{
					textDecoration: 'underline',
					color: '#2E65F3',
					fontSize: 14,
					fontWeight: 700
				}}
			>
				Add Another Product
			</Link>
		</FlexBox>
	)
}

export default AddProductComplete
