import { Box, Tabs } from '@mui/material'
import { CustomTab } from 'styles/components/categoriesNavBar'
import { ProductContext } from 'context/ProductContextProvider'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Category } from 'models'

const CategoriesNavBar = () => {
	const router = useRouter()
	const { setCategory, showedCategories } = useContext(ProductContext)
	return (
		<Box sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
			<Tabs centered value={false}>
				{showedCategories.map((item: Category, index: number) => (
					<CustomTab
						key={index}
						value={item.name}
						label={item.label}
						onClick={() => {
							setCategory(item)
							router.push('/product-list')
						}}
					></CustomTab>
				))}
			</Tabs>
		</Box>
	)
}

export default CategoriesNavBar
