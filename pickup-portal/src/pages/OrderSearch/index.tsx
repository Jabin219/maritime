import { Button, TextField, Typography, CircularProgress } from '@mui/material'
import { OrderContext } from 'contexts/OrderContext'
import { TextContext } from 'contexts/TextContext'
import React, { useContext, useState } from 'react'
import { OrderSearchContainer } from './style'
import { useNavigate } from 'react-router-dom'
import { ResponseStatus } from 'constants/index'

const OrderSearch = () => {
	const navigate = useNavigate()
	const [processing, setProcessing] = useState(false)
	const { setHeaderTitle } = useContext(TextContext)
	setHeaderTitle('Order Search')
	const { setSearchedString, handleSearchOrders, searchedString } =
		useContext(OrderContext)
	return (
		<OrderSearchContainer>
			<Typography>search by pickup number or phone number</Typography>
			<TextField
				size='small'
				fullWidth
				value={searchedString}
				onChange={e => {
					setSearchedString(e.target.value)
				}}
			/>
			<Button
				variant='contained'
				onClick={async () => {
					setProcessing(true)
					const result = await handleSearchOrders(searchedString)
					if (result === ResponseStatus.SUCCESS) {
						setSearchedString('')
						navigate(`/order-search-result`)
					}
				}}
			>
				Search
				{processing && (
					<CircularProgress
						sx={{ position: 'absolute', color: '#fff', left: '45%' }}
						size={24}
					/>
				)}
			</Button>
		</OrderSearchContainer>
	)
}

export default OrderSearch
