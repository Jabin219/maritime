import { Box, Button, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { SampleProducts } from '../../constant/products'
import { Product } from '../../models'
import Image from 'next/image'
import {
	ProductButtonContainer,
	RelatedProductGrid,
	RelatedProductsTitle
} from './style'
import { fourRandomNumberArray, priceFormatter } from '../../utils'
import { addToCart } from '../../utils/cartHandler'
import { ProductContext } from '../../context/ProductContextProvider'
import { SnackContext } from '../../context/SnackContextProvider'

function Product() {
	const router = useRouter()
	const { productId } = router.query
	const [showedProduct, setShowedProduct] = useState<Product>()
	const relatedProducts: Product[] = []
	const relatedProductsIndex = fourRandomNumberArray
	relatedProductsIndex.forEach(index => {
		relatedProducts.push(SampleProducts[index])
	})
	const { cart, setCart } = useContext(ProductContext)
	const { showSnackbar } = useContext(SnackContext)
	const handleAddToCart = () => {
		const thisProduct = {
			...showedProduct,
			quantity: 1
		}
		const result = addToCart(cart, thisProduct as Product)
		showSnackbar('add-to-cart', 'success')
	}
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
						{showedProduct && (
							<Image
								src={showedProduct.coverImage}
								alt='product-image'
								width={500}
								height={500}
							/>
						)}
					</Grid>
					<Grid item xs={5}>
						<Typography
							className='product-name'
							sx={{ fontWeight: 900, fontSize: 40, marginBottom: '40px' }}
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
								${showedProduct?.price} CAD
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
									${showedProduct?.price} CAD
								</Typography>
								<Typography
									className='product-price'
									sx={{
										fontWeight: 700,
										fontSize: 40,
										color: '#FF8800'
									}}
								>
									$
									{priceFormatter(
										Number(showedProduct?.price) -
											Number(showedProduct?.discount)
									)}{' '}
									CAD
								</Typography>
							</>
						)}
						<ProductButtonContainer className='btn-container'>
							<Button
								className='add-to-cart'
								onClick={() => {
									handleAddToCart()
								}}
							>
								Add to Cart
							</Button>
							<Button
								className='buy-now'
								onClick={() => {
									handleAddToCart()
								}}
							>
								Buy Now
							</Button>
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
									<Image
										src={product.coverImage}
										alt='product-image'
										onClick={() => {
											router.push(`/product?productId=${product.id}`)
										}}
										width={500}
										height={500}
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
										)}{' '}
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
