import { getCategories, getProductsCount } from 'api/product'
import { Category, Product } from 'models'
import { useState, createContext, useEffect } from 'react'
import { cartStorage } from '../utils/cartHandler'
import { Categories } from 'constant'

export const ProductContext = createContext<any>(null)
interface Props {
	children: any
}
const ProductContextProvider = ({ children }: Props) => {
	const [showedCategories, setShowedCategories] =
		useState<Category[]>(Categories)
	const [category, setCategory] = useState<Category>(Categories[0])
	const [cart, setCart] = useState<Product[]>(cartStorage)
	const [pagination, setPagination] = useState(1)
	const [paginationCount, setPaginationCount] = useState(0)
	const [sortMethod, setSortMethod] = useState('new-arrivals')
	let storedProducts: any = []

	const countPagination = async (category: string) => {
		const getPaginationCountResult = await getProductsCount(category)
		setPaginationCount(Math.ceil(getPaginationCountResult.data.count / 20) || 1)
	}

	const setCategories = async () => {
		const getCategoriesResult = await getCategories()
		setShowedCategories(Categories.concat(getCategoriesResult.data.categories))
	}

	useEffect(() => {
		setCategories()
	}, [])
	useEffect(() => {
		countPagination(category.name)
		storedProducts.splice(0, storedProducts.length)
		setPagination(1)
		if (category.name === 'new-arrivals') {
			setSortMethod('')
		}
	}, [category])
	useEffect(() => {
		storedProducts.splice(0, storedProducts.length)
	}, [sortMethod])

	return (
		<ProductContext.Provider
			value={{
				category,
				setCategory,
				cart,
				setCart,
				pagination,
				setPagination,
				paginationCount,
				storedProducts,
				sortMethod,
				setSortMethod,
				showedCategories
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}

export default ProductContextProvider
