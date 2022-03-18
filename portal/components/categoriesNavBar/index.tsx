import { Box, Tabs } from '@mui/material'
import { CustomTab } from 'styles/components/categoriesNavBar'
import { Categories } from 'constant/components/categoriesNavBar'
import { ProductContext } from 'context/ProductContextProvider'
import { useContext } from 'react'
import { useRouter } from 'next/router'

function CategoriesNavBar() {
	const router = useRouter()
	const { setCategory } = useContext(ProductContext)
	return (
		<Box sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
			<Tabs centered value={false}>
				{Categories.map((item, index) => (
					<CustomTab
						key={index}
						value={item.value}
						label={item.label}
						onClick={() => {
							setCategory(item.value)
							router.push('/product-list')
						}}
						sx={
							item.label === 'SALE'
								? { color: '#EB0000' }
								: { color: '#333333' }
						}
					></CustomTab>
				))}
			</Tabs>
		</Box>
	)
}

export default CategoriesNavBar
