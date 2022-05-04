import FooterTabs from 'components/FooterTabs'
import React from 'react'
import TextContextProvider from 'contexts/TextContext'
import Header from 'components/Header'
import OrderContextProvider from 'contexts/OrderContext'
import AppRoutes from 'routes'
import { Box } from '@mui/material'

function App() {
	return (
		<OrderContextProvider>
			<TextContextProvider>
				<Header />
				<Box sx={{ paddingBottom: '100px' }}>
					<AppRoutes />
				</Box>
				<FooterTabs />
			</TextContextProvider>
		</OrderContextProvider>
	)
}

export default App
