import { Button, TextField, Typography } from '@mui/material'
import { getOrderByPhoneOrPickupNumber } from 'axios/order'
import { TextContext } from 'contexts/TextContext'
import React, { useContext, useState } from 'react'
import { OrderSearchContainer } from './style'

const OrderSearch = () => {
	const { setHeaderTitle } = useContext(TextContext)
	setHeaderTitle('Order Search')
	const [searchedString, setSearchedString] = useState('')
	const handleSearchOrder = async (searchedString: string) => {
		const ordersResult = await getOrderByPhoneOrPickupNumber(searchedString)
		console.log(ordersResult)
	}
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
					handleSearchOrder(searchedString)
				}}
			>
				Search
			</Button>
		</OrderSearchContainer>
	)
}

export default OrderSearch
