import FooterTabs from 'components/FooterTabs'
import React from 'react'
import TextContextProvider from 'contexts/TextContext'
import Header from 'components/Header'
import OrderContextProvider from 'contexts/OrderContext'
import AppRoutes from 'routes'

function App() {
	return (
		<OrderContextProvider>
			<TextContextProvider>
				<Header />
				<AppRoutes />
				<FooterTabs />
			</TextContextProvider>
		</OrderContextProvider>
	)
}

export default App
