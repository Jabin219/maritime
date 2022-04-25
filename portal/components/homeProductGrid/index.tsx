import { useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import { Category, Product } from 'models'
import Image from 'next/image'
import {
	ProductListGrid,
	ProductListTitle,
	HomeGridButton
} from 'styles/components/homeProductGrid'
import { ProductContext } from 'context/ProductContextProvider'
import { FlexBox } from '../customStyle'
import { ArrowForwardIos } from '@mui/icons-material'
import CustomLink from '../customLink'
import { priceFormatter } from 'utils'
interface Props {
	category: Category
	products: Product[]
}

const HomeProductGrid = ({ category, products }: Props) => {
	return (
		<FlexBox
			className='home-product-grid-container'
			sx={{ marginBottom: '50px' }}
		>
			<ProductListTitle variant='h3'>{category.name}</ProductListTitle>
			<FlexBox
				className='products-container'
				sx={{ flexDirection: 'row', width: '80%' }}
			>
				<Grid container>
					{products &&
						products.map((product, index) => (
							<ProductListGrid key={index} item xs={3}>
								<CustomLink href={`/product/${product._id}`}>
									<Image
										src={product.coverImage}
										alt='product-image'
										width={300}
										height={300}
									/>
								</CustomLink>
								<CustomLink href={`/product/${product._id}`}>
									<Typography variant='h6' className='product-name'>
										{product.name}
									</Typography>
								</CustomLink>

								<Typography
									sx={{
										color: '#ADADAD',
										textDecoration: 'line-through'
									}}
								>
									${priceFormatter(Number(product?.originalPrice))} CAD
								</Typography>
								<Typography className='product-price'>
									${priceFormatter(Number(product?.price))} CAD
								</Typography>
							</ProductListGrid>
						))}
				</Grid>
				<CustomLink href='/product-list'>
					<ArrowForwardIos sx={{ cursor: 'pointer' }} onClick={() => {}} />
				</CustomLink>
			</FlexBox>
			<CustomLink href='/product-list'>
				<HomeGridButton onClick={() => {}}>
					View all {category.name}
				</HomeGridButton>
			</CustomLink>
		</FlexBox>
	)
}

export default HomeProductGrid
