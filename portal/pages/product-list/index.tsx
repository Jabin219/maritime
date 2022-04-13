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
import { getProductsByPagination } from 'api/products'
import { Product } from 'models'

const ProductList = () => {
	const {
		selectedCategory,
		currentPage,
		setCurrentPage,
		pageCount,
		cachedProducts,
		sortMethod,
		setSortMethod
	} = useContext(ProductContext)
	const [listedProducts, setListedProducts] = useState<Product[]>()
	const loadListedProducts = async (
		currentPage: number,
		category: string,
		sortMethod: string
	) => {
		const cachedProductsResult = cachedProducts.find(
			(item: any) => item.currentPage === currentPage
		)
		if (cachedProductsResult) {
			setListedProducts(cachedProductsResult.products)
			return
		}
		const productsLoadedResult = await getProductsByPagination(
			currentPage,
			category,
			sortMethod
		)
		setListedProducts(productsLoadedResult.data.products)
		cachedProducts.push({
			currentPage,
			products: productsLoadedResult.data.products
		})
	}
	const handleChangePage = (event: any, value: number) => {
		setCurrentPage(value)
		window.scrollTo(0, 0)
	}
	useEffect(() => {
		loadListedProducts(currentPage, selectedCategory.name, sortMethod)
	}, [selectedCategory, currentPage, sortMethod])

	return (
		<ProductListPageContainer className='product-list-page'>
			<Grid container>
				<Grid item xs={3}>
					<CategoryList />
				</Grid>
				<Grid item xs>
					<ProductListContainer className='product-list-container'>
						<ProductListTitle variant='h3'>
							{selectedCategory.label}
						</ProductListTitle>
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
							{listedProducts &&
								listedProducts.map((product, index) => (
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
					{selectedCategory.name !== 'new-arrivals' && (
						<Box className='pagination-container'>
							<Pagination
								count={pageCount}
								defaultPage={6}
								color='primary'
								showFirstButton
								showLastButton
								page={currentPage}
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
