import { FlexBox } from 'components/customStyle'
import React from 'react'
import Image from 'next/image'
import { Typography } from '@mui/material'
import CustomLink from 'components/customLink'

const EmptyCart = () => {
	return (
		<FlexBox className='empty-cart-container'>
			<FlexBox className='image-container'>
				<Image
					src='/images/order/empty-cart.png'
					alt='empty-cart'
					width={158}
					height={175}
					layout='fixed'
				/>
			</FlexBox>
			<Typography>
				Your cart is currently empty. &nbsp;
				<CustomLink href='/product-list/all-products'>Go Shopping</CustomLink>
			</Typography>
		</FlexBox>
	)
}

export default EmptyCart
