import { Box, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { getBannerHeight } from 'utils'
import { FlexBox } from 'components/customStyle'
import HomeProductGrid from 'components/homeProductGrid'
import { Category, Product } from 'models'
import { HomePageCategories } from 'constant'
import { getHomePageProducts } from 'api/products'

const Home: NextPage = () => {
	const [bannerHeight, setBannerHeight] = useState(600)
	const [middleBannerHeight, setMiddleBannerHeight] = useState(400)
	const [homePageProducts, setHomePageProducts] = useState<
		{
			category: string
			products: string | Product[]
		}[]
	>([])
	const loadHomePageProducts = async (homePageCategories: string[]) => {
		const homeProductsResult = await getHomePageProducts(homePageCategories)
		setHomePageProducts(homeProductsResult.data.products)
	}
	useEffect(() => {
		setBannerHeight(getBannerHeight(2.4))
		setMiddleBannerHeight(getBannerHeight(3.6))
	}, [])
	useEffect(() => {
		loadHomePageProducts(homePageCategories)
	}, [homePageCategories])
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
			<FlexBox
				sx={{
					width: '100%',
					height: middleBannerHeight,
					background: 'url(/images/home/home-middle-banner.jpg) no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center center'
				}}
			></FlexBox>

			{/* {Categories.map((category, index) => {
				if (!category.showedOnHeader) {
					return
				}
				let listedProducts = []
				if (category.name === 'new-arrivals') {
					listedProducts = SampleProducts.filter(product => product.newArrival)
				} else if (item.value === 'organization' || item.value === 'gifts') {
					return
				} else {
					listedProducts = SampleProducts.filter(
						product => product.category === item.value
					)
				}
				return (
					<Box key={index}>
						<HomeProductGrid
							category={item as Category}
							products={listedProducts.slice(0, 4)}
						/>
						{item.value === 'new-arrivals' && (
							
						)}
					</Box>
				)
			})} */}
		</Box>
	)
}

export default Home
