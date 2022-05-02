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
							sx={
								tabValue === 'home'
									? { color: '#016CBB' }
									: { color: '#ADADAD' }
							}
						/>
					}
					label='Home'
					value={FooterTabValue.home}
				/>
				<Tab
					icon={
						<Search
							sx={
								tabValue === 'search-orders'
									? { color: '#016CBB' }
									: { color: '#ADADAD' }
							}
						/>
					}
					label='Orders'
					value={FooterTabValue.orders}
				/>
				<Tab
					icon={
						<Upload
							sx={
								tabValue === 'add-new-product'
									? { color: '#016CBB' }
									: { color: '#ADADAD' }
							}
						/>
					}
					label='Add New'
					value={FooterTabValue.addNewProduct}
				/>
			</Tabs>
		</FooterTabsContainer>
	)
}

export default FooterTabs
