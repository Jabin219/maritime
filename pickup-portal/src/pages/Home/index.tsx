import React, { useContext } from 'react'
import { Box, Typography } from '@mui/material'
import { Search, Upload } from '@mui/icons-material'
import { HomePageButton } from './style'
import { Link } from 'react-router-dom'
import { TextContext } from 'contexts/TextContext'

const Home = () => {
	const { setHeaderTitle } = useContext(TextContext)
	setHeaderTitle('Home')
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
			<Link to='/order-search'>
				<HomePageButton
					className='search-orders'
					sx={{
						marginBottom: '30px'
					}}
				>
					<Search
						sx={{ color: '#333333', fontSize: 26, marginBottom: '10px' }}
					/>
					<Typography variant='h5'>Order Search</Typography>
				</HomePageButton>
			</Link>
			<Link to='/add-new-product'>
				<HomePageButton className='add-new-product'>
					<Upload
						sx={{ color: '#333333', fontSize: 26, marginBottom: '10px' }}
					/>
					<Typography variant='h5'>Add New Product</Typography>
				</HomePageButton>
			</Link>
		</Box>
	)
}

export default Home
