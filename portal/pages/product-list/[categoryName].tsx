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
import { useRouter } from 'next/router'
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
import { getPagesCount, getProductsByCategory } from 'api/products'
import { Category, Product } from 'models'
import { SortMethod, Categories } from 'constant'

const ProductList = () => {
	const router = useRouter()
	const categoryName = router.query.categoryName as string
	const {
		currentPage,
		setCurrentPage,
		cachedProducts,
		sortMethod,
		setSortMethod
	} = useContext(ProductContext)
	const [listedProducts, setListedProducts] = useState<Product[]>([])
	const [pagesCount, setPagesCount] = useState<any>(0)
	const loadPagesCount = async (category: string) => {
		const pagesCountResult = await getPagesCount(category)
		setPagesCount(pagesCountResult.data.count)
	}
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
		const productsLoadedResult = await getProductsByCategory(
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
	const selectedCategory = Categories.find(
		(category: Category) => category.name === categoryName
	)
	useEffect(() => {
		loadPagesCount(categoryName)
	}, [categoryName])
	useEffect(() => {
		loadListedProducts(currentPage, categoryName, sortMethod)
	}, [currentPage, categoryName, sortMethod])

	return (
		<ProductListPageContainer>
			<Grid container>
				<Grid item xs={3}>
					<CategoryList />
				</Grid>
				<Grid item xs>
					<ProductListContainer className='product-list-container'>
						<ProductListTitle variant='h3'>
							{selectedCategory && selectedCategory.label}
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
								<MenuItem value={SortMethod.newArrivals}>New arrivals</MenuItem>
								<MenuItem value={SortMethod.priceIncrease}>
									Price low to high
								</MenuItem>
								<MenuItem value={SortMethod.priceDecrease}>
									Price high to low
								</MenuItem>
							</Select>
						</FormControl>
						<Grid container>
							{listedProducts &&
								listedProducts.map((product: Product) => (
									<ProductListGrid key={product._id} item xs={3}>
										<CustomLink href={`/product/${product._id}`}>
											<Image
												src={product.coverImage}
												alt='product-image'
												className='product-image'
												width={300}
												height={300}
											/>
										</CustomLink>
										<CustomLink href={`/product/${product._id}`}>
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
					{categoryName !== SortMethod.newArrivals && (
						<Box className='pagination-container'>
							<Pagination
								count={pagesCount}
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
