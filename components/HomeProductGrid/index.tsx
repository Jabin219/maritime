import { useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import { Category, Product } from 'models'
import Image from 'next/image'
import { ProductListGrid, ProductListTitle, HomeGridButton } from './style'
import { ProductContext } from 'context/ProductContextProvider'
import { FlexBox } from '../CustomComponents'
import { ArrowForwardIos } from '@mui/icons-material'
import CustomLink from '../CustomLink'
import { priceFormatter } from 'utils'
interface Props {
	category: Category
	products: Product[]
}

function HomeProductGrid({ category, products }: Props) {
	const { setCategory } = useContext(ProductContext)
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
					{products.map((product, index) => (
						<ProductListGrid key={index} item xs={3}>
							<CustomLink href={`/product?productId=${product.id}`}>
								<Image
									src={product.coverImage}
									alt='product-image'
									width={300}
									height={300}
								/>
							</CustomLink>
							<CustomLink href={`/product?productId=${product.id}`}>
								<Typography variant='h6' className='product-name'>
									{product.name}
								</Typography>
							</CustomLink>
							{Number(product?.discount) === 0 ? (
								<Typography variant='h6' className='product-price'>
									${product.price} CAD
								</Typography>
							) : (
								<>
									<Typography
										sx={{
											color: '#ADADAD',
											textDecoration: 'line-through'
										}}
									>
										${product?.price} CAD
									</Typography>
									<Typography className='product-price'>
										$
										{priceFormatter(
											Number(product?.price) - Number(product?.discount)
										)}{' '}
										CAD
									</Typography>
								</>
							)}
						</ProductListGrid>
					))}
				</Grid>
				<CustomLink href='/product-list'>
					<ArrowForwardIos
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							setCategory(category.value)
						}}
					/>
				</CustomLink>
			</FlexBox>
			<CustomLink href='/product-list'>
				<HomeGridButton
					onClick={() => {
						setCategory(category.value)
					}}
				>
					View all {category.name}
				</HomeGridButton>
			</CustomLink>
		</FlexBox>
	)
}

export default HomeProductGrid
