import { useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import { Category, Product } from '../../models'
import Image from 'next/image'
import { ProductListGrid, ProductListTitle, HomeGridButton } from './style'
import { ProductContext } from '../../context/ProductContextProvider'
import { FlexBox } from '../CustomComponents'
import { ArrowForwardIos } from '@mui/icons-material'
import Link from 'next/link'
interface Props {
	category: Category
	products: Product[]
}

function HomeProductGrid({ category, products }: Props) {
	const { setCategory } = useContext(ProductContext)
	return (
		<FlexBox className='home-product-grid-container'>
			<ProductListTitle variant='h3'>{category.name}</ProductListTitle>
			<FlexBox
				className='products-container'
				sx={{ flexDirection: 'row', width: '80%' }}
			>
				<Grid container>
					{products.map((product, index) => (
						<ProductListGrid key={index} item xs={3}>
							<Image
								src={product.coverImage}
								alt='product-image'
								width={300}
								height={300}
							/>
							<Typography variant='h6' className='product-name'>
								{product.name}
							</Typography>
							<Typography variant='h6' className='product-price'>
								${product.price} CAD
							</Typography>
						</ProductListGrid>
					))}
				</Grid>
				<Link href='/product-list'>
					<ArrowForwardIos
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							setCategory(category.value)
						}}
					/>
				</Link>
			</FlexBox>
			<Link href='/product-list'>
				<HomeGridButton
					onClick={() => {
						setCategory(category.value)
					}}
				>
					View all {category.name}
				</HomeGridButton>
			</Link>
		</FlexBox>
	)
}

export default HomeProductGrid
