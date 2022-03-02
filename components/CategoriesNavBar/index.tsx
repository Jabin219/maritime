import { Box, Tabs } from '@mui/material'
import { CustomTab } from './style'
import { Categories } from './constant'

function CategoriesNavBar() {
	return (
		<Box>
			<Tabs centered>
				{Categories.map((item, index) => (
					<CustomTab
						key={index}
						value={item.value}
						label={item.label}
						sx={item.label === 'SALE' && { color: '#EB0000' }}
					></CustomTab>
				))}
			</Tabs>
		</Box>
	)
}

export default CategoriesNavBar
