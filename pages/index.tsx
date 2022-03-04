import { Box, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { SampleCategories, SampleProducts } from '../constant/products'
import { useState, useEffect } from 'react'
import { getBannerHeight } from '../utils'
import { FlexBox } from '../components/CustomComponents'
import HomeProductGrid from '../components/HomeProductGrid'

const Home: NextPage = () => {
	const [bannerHeight, setBannerHeight] = useState(800)
	useEffect(() => {
		setBannerHeight(getBannerHeight(2.4))
	}, [])
	return (
		<Box className='home-page' sx={{ marginBottom: '100px' }}>
			<FlexBox
				className='home-page-banner'
				sx={{
					width: '100%',
					height: bannerHeight,
					background: 'url(/images/home/home-banner.jpg) no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
			>
				<Typography
					variant='h1'
					sx={{
						color: '#ffffff',
						textShadow: '0px 6px 20px rgba(0, 0, 0, 0.25)'
					}}
				>
					Find Great Deals
				</Typography>
				<Typography
					variant='body2'
					sx={{
						color: '#ffffff',
						textShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)'
					}}
				>
					save more on your households
				</Typography>
			</FlexBox>
			{SampleCategories.map((item, index) => {
				let listedProducts = []
				if (item.value === 'all') {
					return
				}
				if (item.value === 'sale') {
					listedProducts = SampleProducts.filter(
						product => Number(product.discount) > 0
					)
				} else if (item.value === 'new-arrivals') {
					listedProducts = SampleProducts.filter(product => product.newArrival)
				} else {
					listedProducts = SampleProducts.filter(
						product => product.category === item.value
					)
				}
				return (
					<HomeProductGrid
						key={index}
						category={item}
						products={listedProducts.slice(0, 4)}
					/>
				)
			})}
		</Box>
	)
}

export default Home
