import React from 'react'
import { Box, Typography } from '@mui/material'
import { Search, Upload } from '@mui/icons-material'
import { FlexBox } from 'components/FlexBox'

const Home = () => {
	return (
		<Box>
			<Box
				className='logo-container'
				sx={{
					margin: '15px 0 30px',
					'& img': { display: 'block', margin: '0 auto' }
				}}
			>
				<img src='/image/logo.png' alt='maritime-logo' />
			</Box>
			<FlexBox
				className='order-search'
				sx={{
					width: '70%',
					height: 161,
					backgroundColor: '#F5F5F5',
					margin: '0 auto',
					borderRadius: '10px',
					marginBottom: '30px'
				}}
			>
				<Search sx={{ color: '#333333', fontSize: 26, marginBottom: '10px' }} />
				<Typography variant='h5'>Order Search</Typography>
			</FlexBox>
			<FlexBox
				className='upload-new-product'
				sx={{
					width: '70%',
					height: 161,
					backgroundColor: '#F5F5F5',
					margin: '0 auto',
					borderRadius: '10px'
				}}
			>
				<Upload sx={{ color: '#333333', fontSize: 26, marginBottom: '10px' }} />
				<Typography variant='h5'>Upload New Product</Typography>
			</FlexBox>
		</Box>
	)
}

export default Home
