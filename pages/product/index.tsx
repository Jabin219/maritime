import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SampleProducts } from '../../constant/products'
import { Product } from '../../models'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {
	ProductButtonContainer,
	RelatedProductGrid,
	RelatedProductsTitle
} from './style'
import { getFourRandomNumberArray, priceFormatter } from '../../utils'

function Product() {
	const router = useRouter()
	const { productId } = router.query
	const [showedProduct, setShowedProduct] = useState<Product>()
	const relatedProducts: Product[] = []
	const relatedProductsIndex = getFourRandomNumberArray(0, 17)
	relatedProductsIndex.forEach(index => {
		relatedProducts.push(SampleProducts[index])
	})
	useEffect(() => {
		setShowedProduct(
			SampleProducts.find(item => {
				return item.id === productId
			})
		)
	}, [productId])

	return (
		<Box className='product-detail-page'>
			<Box
				className='product-detail-container'
				sx={{ margin: '105px auto', width: '60%' }}
			>
				<Grid container spacing={10}>
					<Grid
						item
						xs={7}
						sx={{
							'& img': {
								width: '80%'
							}
						}}
					>
						<LazyLoadImage src={showedProduct?.coverImage} />
					</Grid>
					<Grid item xs={5}>
						<Typography
							className='product-name'
							sx={{ fontWeight: 900, fontSize: 40, marginBottom: '15px' }}
						>
							{showedProduct?.name}
						</Typography>
						{Number(showedProduct?.discount) === 0 ? (
							<Typography
								className='product-price'
								sx={{
									fontWeight: 700,
									fontSize: 40,
									color: '#FF8800'
								}}
							>
								{showedProduct?.price}
							</Typography>
						) : (
							<>
								<Typography
									className='product-price'
									sx={{
										fontWeight: 500,
										fontSize: 40,
										color: '#ADADAD',
										textDecoration: 'line-through',
										marginBottom: '15px'
									}}
								>
									{showedProduct?.price}
								</Typography>
								<Typography
									className='product-price'
									sx={{
										fontWeight: 700,
										fontSize: 40,
										color: '#FF8800'
									}}
								>
									{priceFormatter(
										Number(showedProduct?.price) -
											Number(showedProduct?.discount)
									)}
								</Typography>
							</>
						)}
						<ProductButtonContainer className='btn-container'>
							<Button className='add-to-cart'>Add to Cart</Button>
							<Button className='buy-now'>Buy Now</Button>
						</ProductButtonContainer>
					</Grid>
				</Grid>
			</Box>
			<Box className='related-products-container'>
				<RelatedProductsTitle variant='h6'>
					You May Also Like
				</RelatedProductsTitle>
				<Box>
					<Grid container sx={{ width: '70%', margin: '0 auto' }}>
						{relatedProducts &&
							relatedProducts.map((product, index) => (
								<RelatedProductGrid key={index} xs={3}>
									<LazyLoadImage
										src={product.coverImage}
										onClick={() => {
											router.push(`/product?productId=${product.id}`)
										}}
									/>
									<Typography
										className='product-name'
										onClick={() => {
											router.push(`/product?productId=${product.id}`)
										}}
									>
										{product.name}
									</Typography>
									<Typography className='product-price'>
										$
										{priceFormatter(
											Number(product.price) - Number(product.discount)
										)}
										CAD
									</Typography>
								</RelatedProductGrid>
							))}
					</Grid>
				</Box>
			</Box>
		</Box>
	)
}

export default Product
