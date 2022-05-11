import React from 'react'
import { Box, Typography } from '@mui/material'
import { Search, Upload } from '@mui/icons-material'
import { HomePageButton } from './style'

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
			<HomePageButton
				className='order-search'
				sx={{
					marginBottom: '30px'
				}}
			>
				<Search sx={{ color: '#333333', fontSize: 26, marginBottom: '10px' }} />
				<Typography variant='h5'>Order Search</Typography>
			</HomePageButton>
			<HomePageButton className='upload-new-product'>
				<Upload sx={{ color: '#333333', fontSize: 26, marginBottom: '10px' }} />
				<Typography variant='h5'>Upload New Product</Typography>
			</HomePageButton>
		</Box>
	)
}

export default Home
