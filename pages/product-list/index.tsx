import { Box, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import CategoryList from '../../components/CategoryList'
import { SampleCategories, SampleProducts } from '../../constant/products'
import { ProductContext } from '../../context/ProductContextProvider'
import Image from 'next/image'
import {
	ProductListGrid,
	ProductListTitle,
	ProductListContainer
} from './style'
import { useRouter } from 'next/router'
import { priceFormatter } from '../../utils'

function ProductList() {
	const router = useRouter()
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
									<Image
										src={product.coverImage}
										alt='product-image'
										className='product-image'
										onClick={() => {
											router.push(`/product?productId=${product.id}`)
										}}
										width={300}
										height={300}
									/>
									<Typography
										variant='h6'
										className='product-name'
										onClick={() => {
											router.push(`/product?productId=${product.id}`)
										}}
									>
										{product.name}
									</Typography>
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
