import OrderSearch from 'pages/OrderSearch'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import FooterTabs from 'components/FooterTabs'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/order-search' element={<OrderSearch />} />
			</Routes>
			<FooterTabs />
		</>
	)
}

export default App
