import { Box, Tabs } from '@mui/material'
import { CustomTab } from 'styles/components/categoriesNavBar'
import { ProductContext } from 'context/ProductContextProvider'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Category } from 'models'

const CategoriesNavBar = () => {
	const router = useRouter()
	const { setSelectedCategory, categories } = useContext(ProductContext)
	return (
		<Box>
			<Tabs centered value={false}>
				{categories.map((item: Category, index: number) => (
					<CustomTab
						key={index}
						value={item.name}
						label={item.label}
						onClick={() => {
							setSelectedCategory(item)
							router.push('/product-list')
						}}
					></CustomTab>
				))}
			</Tabs>
		</Box>
	)
}

export default CategoriesNavBar
