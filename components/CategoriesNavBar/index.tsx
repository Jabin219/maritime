import { Box, Tabs } from '@mui/material'
import { CustomTab } from './style'

function CategoriesNavBar() {
	return (
		<Box>
			<Tabs centered>
				<CustomTab value='all' label='All'></CustomTab>
				<CustomTab value='new-arrivals' label='New Arrivals'></CustomTab>
				<CustomTab value='furniture' label='Furniture'></CustomTab>
				<CustomTab value='closing' label='Closing'></CustomTab>
				<CustomTab value='appliance' label='Appliance'></CustomTab>
				<CustomTab value='organization' label='Organization'></CustomTab>
				<CustomTab value='decors' label='Decors'></CustomTab>
				<CustomTab value='gifts' label='Gifts'></CustomTab>
				<CustomTab
					value='sale'
					label='SALE'
					sx={{ color: '#EB0000' }}
				></CustomTab>
			</Tabs>
		</Box>
	)
}

export default CategoriesNavBar
