import { Box, Tabs } from '@mui/material'
import { CustomTab } from './style'
import { Categories } from './constant'
import { ProductContext } from '../../context/ProductContextProvider'
import { useContext } from 'react'

function CategoriesNavBar() {
	const { setCategory } = useContext(ProductContext)
	return (
		<Box sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
			<Tabs centered>
				{Categories.map((item, index) => (
					<CustomTab
						key={index}
						value={item.value}
						label={item.label}
						onClick={() => {
							setCategory(item.value)
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
