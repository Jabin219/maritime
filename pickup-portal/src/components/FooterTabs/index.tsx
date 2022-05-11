import { Tabs, Tab } from '@mui/material'
import { FooterTabValue } from 'constants/index'
import React, { useState } from 'react'
import { FooterTabsContainer } from './style'
import { Home, Search, Upload } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

const FooterTabs = () => {
	const navigate = useNavigate()
	const location = useLocation()
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
							sx={{
								color: `${location.pathname === '/' ? '#016CBB' : '#ADADAD'}`
							}}
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
								color: `${
									location.pathname === '/order-search' ? '#016CBB' : '#ADADAD'
								}`
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
									location.pathname === '/add-new-product'
										? '#016CBB'
										: '#ADADAD'
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
