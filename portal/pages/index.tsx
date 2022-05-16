import { Box, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { getBannerHeight } from 'utils'
import { FlexBox } from 'components/customStyle'
import HomeProductGrid from 'components/homeProductGrid'
import { Product } from 'models'
import { HomePageCategories, HomePageCategoriesEnum } from 'constant'
import { getHomePageProducts } from 'api/products'

const Home: NextPage = () => {
	const categoryNames = HomePageCategories.map(category => category.name)
	const [homePageProducts, setHomePageProducts] = useState<
		{
			_id: string
			resultProducts: string | Product[]
		}[]
	>([])
	const loadHomePageProducts = async (categoryNames: string[]) => {
		const homeProductsResult = await getHomePageProducts(
			JSON.stringify(categoryNames)
		)
		setHomePageProducts(homeProductsResult.data.products)
	}
	useEffect(() => {
		loadHomePageProducts(categoryNames)
	}, [])
	return (
		<Box className='home-page'>
			<FlexBox
				className='home-page-banner'
				sx={{
					width: '100%',
					height: getBannerHeight(2.4),
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

			{HomePageCategories.map((category, index) => {
				const listedProducts = homePageProducts.find(
					item => item._id === category.name
				)?.resultProducts as Product[]
				return (
					<Box key={index}>
						<HomeProductGrid category={category} products={listedProducts} />
						{category.name === HomePageCategoriesEnum.newArrivals && (
							<FlexBox
								sx={{
									width: '100%',
									height: getBannerHeight(3.6),
									background:
										'url(/images/home/home-middle-banner.jpg) no-repeat',
									backgroundSize: 'cover',
									backgroundPosition: 'center center'
								}}
							></FlexBox>
						)}
					</Box>
				)
			})}
		</Box>
	)
}

export default Home
