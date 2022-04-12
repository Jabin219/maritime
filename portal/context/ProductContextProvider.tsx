import { getCategories, getProductsCount } from 'api/products'
import { Category, Product } from 'models'
import { useState, createContext, useEffect } from 'react'
import { cartStorage, saveCart } from '../utils/cartHandler'
import { Categories } from 'constant'

export const ProductContext = createContext<any>(null)
interface Props {
	children: any
}
const ProductContextProvider = ({ children }: Props) => {
	const [categories, setCategories] = useState<Category[]>([])
	const [selectedCategory, setSelectedCategory] = useState<Category>(
		Categories[0]
	)
	const [cart, setCart] = useState<Product[]>(cartStorage)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageCount, setPageCount] = useState(0)
	const [sortMethod, setSortMethod] = useState('new-arrivals')
	const calculatePageCount = async (category: string) => {
		const pageCountResult = await getProductsCount(category)
		setPageCount(Math.ceil(pageCountResult.data.count / 20) || 1)
	}
	const loadCategories = async () => {
		const categoriesResult = await getCategories()
		setCategories(Categories.concat(categoriesResult.data.categories))
	}
	let cachedProducts: any = []

	useEffect(() => {
		loadCategories()
	}, [])
	useEffect(() => {
		calculatePageCount(selectedCategory.name)
		cachedProducts.splice(0, cachedProducts.length)
		setCurrentPage(1)
		if (selectedCategory.name === 'new-arrivals') {
			setSortMethod('')
		}
	}, [selectedCategory])
	useEffect(() => {
		cachedProducts.splice(0, cachedProducts.length)
	}, [sortMethod])
	useEffect(() => {
		saveCart(cart)
	}, [cart])

	return (
		<ProductContext.Provider
			value={{
				selectedCategory,
				setSelectedCategory,
				cart,
				setCart,
				currentPage,
				setCurrentPage,
				pageCount,
				cachedProducts,
				sortMethod,
				setSortMethod,
				categories
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}

export default ProductContextProvider
