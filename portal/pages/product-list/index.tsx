import { Box, Grid, Typography, Pagination } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import CategoryList from 'components/categoryList'
import { SampleCategories } from 'constant/products'
import { ProductContext } from 'context/ProductContextProvider'
import Image from 'next/image'
import { priceFormatter } from 'utils'
import CustomLink from 'components/customLink'
import {
	ProductListContainer,
	ProductListTitle,
	ProductListGrid
} from 'styles/pages/product-list'
import { getProducts } from 'api/product'
import { Product } from 'models'

const ProductList = () => {
	const { category } = useContext(ProductContext)
	const [showedProducts, setShowedProducts] = useState<Product[]>()
	const [pagination, setPagination] = useState(1)
	const [sortMethod, setSortMethod] = useState('')
	const [title, setTitle] = useState('')
	const getShowedProducts = async (
		pagination: number,
		category: string,
		sortMethod: string
	) => {
		const getProductsResult = await getProducts({
			pagination,
			category,
			sortMethod
		})
		console.log(getProductsResult.data.products)
		setShowedProducts(getProductsResult.data.products)
	}
	useEffect(() => {
		getShowedProducts(pagination, category, sortMethod)
	}, [category, pagination, sortMethod])

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
							{showedProducts &&
								showedProducts.map((product, index) => (
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
					</ProductListContainer>
					<Pagination count={-1} page={1} />
				</Grid>
			</Grid>
		</Box>
	)
}

export default ProductList
