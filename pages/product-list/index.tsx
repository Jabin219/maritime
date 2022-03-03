import { Box, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import CategoryList from '../../components/CategoryList'
import { SampleCategories, SampleProducts } from '../../constant/products'
import { ProductContext } from '../../context/ProductContextProvider'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {
	ProductListGrid,
	ProductListTitle,
	ProductListContainer
} from './style'

function ProductList() {
	const { category } = useContext(ProductContext)
	const [showedProducts, setShowedProducts] = useState(SampleProducts)
	const [title, setTitle] = useState('')
	const updateShowedProducts = (category: string) => {
		setShowedProducts(
			SampleProducts.filter(product => {
				return product.category === category
			})
		)
		setTitle(
			(
				SampleCategories.find(item => {
					return item.value === category
				}) as any
			).name
		)
		if (category === 'all') {
			setShowedProducts(SampleProducts)
			setTitle('All Products')
		}
		if (category === 'new-arrivals') {
			setShowedProducts(
				SampleProducts.filter(product => {
					return product.newArrival
				})
			)
			setTitle('New Arrivals')
		}
		if (category === 'sale') {
			setShowedProducts(
				SampleProducts.filter(product => {
					return Number(product.discount) > 0
				})
			)
			setTitle('On Sale')
		}
	}
	useEffect(() => {
		updateShowedProducts(category)
	}, [category])

	return (
		<Box className='product-list-page'>
			<Grid container>
				<Grid item xs={3}>
					<CategoryList Categories={SampleCategories} />
				</Grid>
				<Grid item xs>
					<ProductListContainer className='product-list-container'>
						<ProductListTitle variant='h3'>{title}</ProductListTitle>
						<Grid container>
							{showedProducts.map((product, index) => (
								<ProductListGrid key={index} item xs={3}>
									<LazyLoadImage src={product.coverImage} alt='product' />
									<Typography variant='h6' className='product-name'>
										{product.name}
									</Typography>
									<Typography variant='h6' className='product-price'>
										${product.price} CAD
									</Typography>
								</ProductListGrid>
							))}
						</Grid>
					</ProductListContainer>
				</Grid>
			</Grid>
		</Box>
	)
}

export default ProductList
