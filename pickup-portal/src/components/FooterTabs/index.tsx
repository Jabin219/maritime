import { Tabs, Tab } from '@mui/material'
import { FooterTabValue } from 'constants/index'
import React from 'react'
import { FooterTabsContainer } from './style'
import { Home, Search, Upload } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

const FooterTabs = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const handleChangePath = (event: any, newValue: any) => {
		navigate(`/${newValue === 'home' ? '' : newValue}`)
	}
	const getTabValue = () => {
		if (location.pathname === '/') {
			return FooterTabValue.home
		}
		if (location.pathname.includes('order')) {
			return FooterTabValue.orders
		}
		if (location.pathname.includes('product')) {
			return FooterTabValue.addNewProduct
		}
		return FooterTabValue.home
	}
	return (
		<FooterTabsContainer>
			<Tabs
				centered
				value={getTabValue()}
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
									location.pathname.includes('order') ? '#016CBB' : '#ADADAD'
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
									location.pathname.includes('product') ? '#016CBB' : '#ADADAD'
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
