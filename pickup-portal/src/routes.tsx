import React from 'react'
import { Routes, Route } from 'react-router-dom'
import OrderSearch from 'pages/OrderSearch'
import Home from 'pages/Home'
import OrderSearchResult from 'pages/OrderSearchResult'
import OrderDetail from 'pages/OrderDetail'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/order-search' element={<OrderSearch />} />
			<Route path='/order-search-result' element={<OrderSearchResult />} />
			<Route path='/order-detail/:orderId' element={<OrderDetail />} />
		</Routes>
	)
}

export default AppRoutes
