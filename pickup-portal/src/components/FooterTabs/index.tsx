import { Box, Tabs, Tab } from '@mui/material'
import React from 'react'

const FooterTabs = () => {
	return (
		<Box sx={{ position: 'fixed', bottom: 0 }}>
			<Tabs>
				<Tab label='Item One' />
				<Tab label='Item Two' />
				<Tab label='Item Three' />
			</Tabs>
		</Box>
	)
}

export default FooterTabs
