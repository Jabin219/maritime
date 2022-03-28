import { Box, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import CategoryList from 'components/categoryList'
import { SampleCategories, SampleProducts } from 'constant/products'
import { ProductContext } from 'context/ProductContextProvider'
import Image from 'next/image'
import { priceFormatter } from 'utils'
import CustomLink from 'components/customLink'
import {
	ProductListContainer,
	ProductListTitle,
	ProductListGrid
} from 'styles/pages/product-list'

const ProductList = () => {
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
									<CustomLink href={`/product?productId=${product.id}`}>
										<Image
											src={product.coverImage}
											alt='product-image'
											className='product-image'
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
					</ProductListContainer>
				</Grid>
			</Grid>
		</Box>
	)
}

export default ProductList
