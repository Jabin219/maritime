import FooterTabs from 'components/FooterTabs'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import TextContextProvider from 'contexts/TextContext'
import Header from 'components/Header'
import OrderSearch from 'pages/OrderSearch'
import OrderContextProvider from 'contexts/OrderContext'

function App() {
	return (
		<OrderContextProvider>
			<TextContextProvider>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/order-search' element={<OrderSearch />} />
				</Routes>
				<FooterTabs />
			</TextContextProvider>
		</OrderContextProvider>
	)
}

export default App
