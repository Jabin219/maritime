import { Box, Button, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Product } from 'models'
import Image from 'next/image'
import {
	RelatedProductGrid,
	ProductButtonContainer,
	RelatedProductsTitle,
	ProductDetailContainer
} from 'styles/pages/product'
import { priceFormatter } from 'utils'
import { addToCart } from 'utils/cartHandler'
import { ProductContext } from 'context/ProductContextProvider'
import { SnackContext } from 'context/SnackContextProvider'
import CustomLink from 'components/customLink'
import { getProductById } from 'api/products'
import ProductImages from 'components/ProductImages'
const Product = () => {
	const router = useRouter()
	const productId = router.query.productId as string
	const [showedProduct, setShowedProduct] = useState<Product>()
	const [largeImage, setLargeImage] = useState<string>('')
	const { cart, setCart } = useContext(ProductContext)
	const { showSnackbar } = useContext(SnackContext)
	const handleAddToCart = () => {
		const thisProduct = {
			...showedProduct,
			quantity: 1
		}
		addToCart(cart, thisProduct as Product, setCart)
		showSnackbar('add-to-cart')
	}
	const loadProduct = async (productId: string) => {
		const productResult = await getProductById(productId)
		setShowedProduct({
			...productResult.data.product,
			images: JSON.parse(productResult.data.product.images)
		})
		setLargeImage(JSON.parse(productResult.data.product.images)[0])
	}
	useEffect(() => {
		productId && loadProduct(productId as string)
	}, [productId])

	return (
		<Box sx={{ minHeight: '100vh' }}>
			{showedProduct && (
				<ProductDetailContainer>
					<Box
						className='product-info'
						sx={{ margin: '0 auto', marginTop: '100px', width: '60%' }}
					>
						<Grid container spacing={10}>
							<Grid item xs={7} className='product-image'>
								<ProductImages
									showedProduct={showedProduct}
									largeImage={largeImage}
									setLargeImage={setLargeImage}
								/>
							</Grid>
							<Grid item xs={5}>
								<Typography variant='h2' className='product-name'>
									{showedProduct?.name}
								</Typography>
								<Typography className='product-original-price'>
									${priceFormatter(Number(showedProduct?.originalPrice))} CAD
								</Typography>
								<Typography className='product-price'>
									${priceFormatter(Number(showedProduct?.price))} CAD
								</Typography>
								<ProductButtonContainer className='btn-container'>
									<Button
										className='add-to-cart'
										onClick={() => {
											handleAddToCart()
										}}
									>
										Add to Cart
									</Button>
									<CustomLink href='/order'>
										<Button
											className='buy-now'
											onClick={() => {
												handleAddToCart()
											}}
										>
											Buy Now
										</Button>
									</CustomLink>
								</ProductButtonContainer>
							</Grid>
						</Grid>
					</Box>
					<Box
						className='related-products-container'
						sx={{ paddingBottom: '100px' }}
					>
						<RelatedProductsTitle variant='h6'>
							You May Also Like
						</RelatedProductsTitle>
						<Box>
							<Grid
								container
								sx={{ width: '70%', margin: '0 auto' }}
								spacing={2}
							>
								{showedProduct?.recommendedProducts &&
									showedProduct?.recommendedProducts.map((product, index) => (
										<RelatedProductGrid item key={index} xs={3}>
											<Image
												src={product.coverImage}
												alt='product-image'
												onClick={() => {
													router.push(`/product/${product._id}`)
												}}
												width={500}
												height={500}
											/>
											<Typography
												className='product-name'
												onClick={() => {
													router.push(`/product/${product._id}`)
												}}
											>
												{product.name}
											</Typography>
											<Typography
												sx={{
													color: '#ADADAD',
													textDecoration: 'line-through'
												}}
											>
												${priceFormatter(Number(product.originalPrice))} CAD
											</Typography>
											<Typography className='product-price'>
												${priceFormatter(Number(product.price))} CAD
											</Typography>
										</RelatedProductGrid>
									))}
							</Grid>
						</Box>
					</Box>
				</ProductDetailContainer>
			)}
		</Box>
	)
}
export default Product
