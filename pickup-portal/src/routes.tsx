import React from 'react'
import { Routes, Route } from 'react-router-dom'
import OrderSearch from 'pages/OrderSearch'
import Home from 'pages/Home'
import OrderSearchResult from 'pages/OrderSearchResult'
import OrderDetail from 'pages/OrderDetail'
import OrderPickupComplete from 'pages/OrderPickupComplete'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/order-search' element={<OrderSearch />} />
			<Route path='/order-search-result' element={<OrderSearchResult />} />
			<Route path='/order-detail/:orderId' element={<OrderDetail />} />
			<Route path='/order-pickup-complete' element={<OrderPickupComplete />} />
		</Routes>
	)
}

export default AppRoutes
