import { Tabs, Tab } from '@mui/material'
import { FooterTabValue } from 'constants/index'
import React, { useState } from 'react'
import { FooterTabsContainer } from './style'
import { Home, Search, Upload } from '@mui/icons-material'

const FooterTabs = () => {
	const [tabValue, setTabValue] = useState(FooterTabValue.home)
	return (
		<FooterTabsContainer>
			<Tabs centered>
				<Tab icon={<Home />} label='Home' value={FooterTabValue.home} />
				<Tab icon={<Search />} label='Orders' value={FooterTabValue.orders} />
				<Tab
					icon={<Upload />}
					label='Add New'
					value={FooterTabValue.addNewProduct}
				/>
			</Tabs>
		</FooterTabsContainer>
	)
}

export default FooterTabs
