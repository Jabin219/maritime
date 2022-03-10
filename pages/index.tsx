import { Box, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { HomePageCategories, SampleProducts } from 'constant/products'
import { useState, useEffect } from 'react'
import { getBannerHeight } from 'utils'
import { FlexBox } from 'components/customComponents'
import HomeProductGrid from 'components/homeProductGrid'
import { Category } from 'models'

const Home: NextPage = () => {
	const [bannerHeight, setBannerHeight] = useState(600)
	const [middleBannerHeight, setMiddleBannerHeight] = useState(400)
	useEffect(() => {
		setBannerHeight(getBannerHeight(2.4))
		setMiddleBannerHeight(getBannerHeight(3.6))
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
			{HomePageCategories.map((item, index) => {
				let listedProducts = []
				if (item.value === 'all') {
					return
				} else if (item.value === 'sale') {
					listedProducts = SampleProducts.filter(
						product => Number(product.discount) > 0
					)
				} else if (item.value === 'new-arrivals') {
					listedProducts = SampleProducts.filter(product => product.newArrival)
				} else if (item.value === 'organization' || item.value === 'gifts') {
					return
				} else {
					listedProducts = SampleProducts.filter(
						product => product.category === item.value
					)
				}
				return (
					<>
						<HomeProductGrid
							key={index}
							category={item as Category}
							products={listedProducts.slice(0, 4)}
						/>
						{item.value === 'sale' && (
							<FlexBox
								sx={{
									width: '100%',
									height: middleBannerHeight,
									background:
										'url(/images/home/home-middle-banner.jpg) no-repeat',
									backgroundSize: 'cover'
								}}
							></FlexBox>
						)}
					</>
				)
			})}
		</Box>
	)
}

export default Home
