import { Box, Typography } from '@mui/material'
import { TextContext } from 'contexts/TextContext'
import React, { useContext } from 'react'

const OrderSearch = () => {
	const { setHeaderTitle } = useContext(TextContext)
	setHeaderTitle('Order Search')
	return (
		<Box sx={{ paddingTop: '100px' }}>
			<Typography>Search by pick up number or phone number</Typography>
		</Box>
	)
}

export default OrderSearch
