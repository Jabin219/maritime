import FooterTabs from 'components/FooterTabs'
import React from 'react'
import TextContextProvider from 'contexts/TextContext'
import Header from 'components/Header'
import OrderContextProvider from 'contexts/OrderContext'
import AppRoutes from 'routes'
import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'

const App = () => {
	const location = useLocation()
	return (
		<OrderContextProvider>
			<TextContextProvider>
				{location.pathname !== '/' && <Header />}
				<Box sx={{ paddingBottom: '100px' }}>
					<AppRoutes />
				</Box>
				<FooterTabs />
			</TextContextProvider>
		</OrderContextProvider>
	)
}

export default App
