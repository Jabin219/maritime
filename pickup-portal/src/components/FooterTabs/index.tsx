import { Tabs, Tab } from '@mui/material'
import { FooterTabValue } from 'constants/index'
import React, { useState } from 'react'
import { FooterTabsContainer } from './style'
import { Home, Search, Upload } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const FooterTabs = () => {
	const navigate = useNavigate()
	const [tabValue, setTabValue] = useState(FooterTabValue.home)
	const handleChangePath = (event: any, newValue: any) => {
		setTabValue(newValue)
		navigate(`/${newValue === 'home' ? '' : newValue}`)
	}
	return (
		<FooterTabsContainer>
			<Tabs
				centered
				value={tabValue}
				onChange={handleChangePath}
				indicatorColor='secondary'
			>
				<Tab
					icon={
						<Home
							sx={{ color: `${tabValue === 'home' ? '#016CBB' : '#ADADAD'}` }}
						/>
					}
					label='Home'
					value={FooterTabValue.home}
					disableRipple
				/>
				<Tab
					icon={
						<Search
							sx={{
								color: `${tabValue === 'search-orders' ? '#016CBB' : '#ADADAD'}`
							}}
						/>
					}
					label='Orders'
					value={FooterTabValue.orders}
					disableRipple
				/>
				<Tab
					icon={
						<Upload
							sx={{
								color: `${
									tabValue === 'add-new-product' ? '#016CBB' : '#ADADAD'
								}`
							}}
						/>
					}
					label='Add New'
					value={FooterTabValue.addNewProduct}
					disableRipple
				/>
			</Tabs>
		</FooterTabsContainer>
	)
}

export default FooterTabs
