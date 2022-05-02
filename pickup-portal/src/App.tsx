import OrderSearch from 'pages/OrderSearch'
import FooterTabs from 'components/FooterTabs'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/search-orders' element={<OrderSearch />} />
			</Routes>
			<FooterTabs />
		</>
	)
}

export default App
