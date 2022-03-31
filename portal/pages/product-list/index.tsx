import {
	Box,
	Grid,
	Typography,
	Pagination,
	Select,
	MenuItem,
	InputLabel,
	FormControl
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import CategoryList from 'components/categoryList'
import { ProductContext } from 'context/ProductContextProvider'
import Image from 'next/image'
import { priceFormatter } from 'utils'
import CustomLink from 'components/customLink'
import {
	ProductListContainer,
	ProductListTitle,
	ProductListGrid,
	ProductListPageContainer
} from 'styles/pages/product-list'
import { getProducts } from 'api/product'
import { Product } from 'models'

const ProductList = () => {
	const {
		category,
		pagination,
		setPagination,
		paginationCount,
		storedProducts,
		sortMethod,
		setSortMethod
	} = useContext(ProductContext)
	const [showedProducts, setShowedProducts] = useState<Product[]>()
	const getShowedProducts = async (
		pagination: number,
		category: string,
		sortMethod: string
	) => {
		const findStoredProductsResult = storedProducts.find(
			(item: any) => item.pagination === pagination
		)
		if (findStoredProductsResult) {
			setShowedProducts(findStoredProductsResult.products)
			return
		}
		const getProductsResult = await getProducts({
			pagination,
			category,
			sortMethod
		})
		setShowedProducts(getProductsResult.data.products)
		storedProducts.push({
			pagination,
			products: getProductsResult.data.products
		})
	}
	const handleChangePage = (event: any, value: number) => {
		setPagination(value)
		window.scrollTo(0, 0)
	}
	useEffect(() => {
		getShowedProducts(pagination, category.name, sortMethod)
	}, [category, pagination, sortMethod])

	return (
		<ProductListPageContainer className='product-list-page'>
			<Grid container>
				<Grid item xs={3}>
					<CategoryList />
				</Grid>
				<Grid item xs>
					<ProductListContainer className='product-list-container'>
						<ProductListTitle variant='h3'>{category.label}</ProductListTitle>
						<FormControl className='sort-by-select'>
							<InputLabel>Sort by</InputLabel>
							<Select
								label='Sort by'
								value={sortMethod}
								onChange={event => {
									setSortMethod(event.target.value)
								}}
							>
								<MenuItem value='new-arrivals'>New Arrivals</MenuItem>
								<MenuItem value='price-increase'>Price Increase</MenuItem>
								<MenuItem value='price-decrease'>Price Decrease</MenuItem>
							</Select>
						</FormControl>
						<Grid container>
							{showedProducts &&
								showedProducts.map((product, index) => (
									<ProductListGrid key={index} item xs={3}>
										<CustomLink href={`/product?productId=${product._id}`}>
											<Image
												src={product.coverImage}
												alt='product-image'
												className='product-image'
												width={300}
												height={300}
											/>
										</CustomLink>
										<CustomLink href={`/product?productId=${product._id}`}>
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
					{category.name !== 'new-arrivals' && (
						<Box className='pagination-container'>
							<Pagination
								count={paginationCount}
								defaultPage={6}
								color='primary'
								showFirstButton
								showLastButton
								page={pagination}
								onChange={handleChangePage}
							/>
						</Box>
					)}
				</Grid>
			</Grid>
		</ProductListPageContainer>
	)
}

export default ProductList
