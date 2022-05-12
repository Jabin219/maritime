import { Box, Tabs } from '@mui/material'
import { CustomTab } from 'styles/components/categoriesNavBar'
import { ProductContext } from 'context/ProductContextProvider'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Category } from 'models'
import { Categories } from 'constant'

const CategoriesNavBar = () => {
	const router = useRouter()
	const { handleChangeCategory } = useContext(ProductContext)
	return (
		<Box>
			<Tabs centered value={false}>
				{Categories.map(
					(category: Category, index: number) =>
						category.showedOnHeader && (
							<CustomTab
								key={index}
								value={category.name}
								label={category.label}
								sx={{
									color:
										router.asPath === `/product-list/${category.name}`
											? '#FF8800'
											: '#333333',
									fontFamily: 'Source Sans Pro',
									fontWeight: 600,
									fontSize: 18
								}}
								onClick={() => {
									handleChangeCategory()
									router.push(`/product-list/${category.name}`)
								}}
							></CustomTab>
						)
				)}
			</Tabs>
		</Box>
	)
}

export default CategoriesNavBar
