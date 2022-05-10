import { Button, TextField, Typography } from '@mui/material'
import { OrderContext } from 'contexts/OrderContext'
import { TextContext } from 'contexts/TextContext'
import React, { useContext } from 'react'
import { OrderSearchContainer } from './style'
import { useNavigate } from 'react-router-dom'

const OrderSearch = () => {
	const navigate = useNavigate()
	const { setHeaderTitle } = useContext(TextContext)
	setHeaderTitle('Order Search')
	const { setSearchedString } = useContext(OrderContext)
	return (
		<OrderSearchContainer>
			<Typography>search by pick up number or phone number</Typography>
			<TextField
				size='small'
				fullWidth
				onChange={e => {
					setSearchedString(e.target.value)
				}}
			/>
			<Button
				variant='contained'
				onClick={() => {
					navigate(`/order-search-result`)
				}}
			>
				Search
			</Button>
		</OrderSearchContainer>
	)
}

export default OrderSearch
