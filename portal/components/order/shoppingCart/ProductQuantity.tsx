import { Add, Remove } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import { Order, Product } from 'models'
import React from 'react'
import { quantityIncrease, quantityDecrease } from 'utils/cartHandler'

interface Props {
	cartItem: Product
	cart: Product[]
	setCart: (cart: Product[]) => void
	order: Order
	setOrder: (order: Order) => void
}

const ProductQuantity = ({
	cartItem,
	cart,
	setCart,
	order,
	setOrder
}: Props) => {
	return (
		<Grid
			container
			className='product-quantity-detail'
			sx={{ border: '1px solid #ADADAD' }}
		>
			<Grid
				item
				xs={4.5}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<IconButton
					className='btn-decrease'
					disableRipple
					disabled={Number(cartItem.quantity) <= 1 ? true : false}
					onClick={() => {
						if (cartItem.outOfStock) {
							cartItem.outOfStock = false
							setCart(cart)
						}
						quantityDecrease(cartItem, cart, setCart, order, setOrder)
					}}
				>
					<Remove fontSize='medium' sx={{ color: '#333333' }} />
				</IconButton>
			</Grid>
			<Grid
				item
				xs
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<Typography variant='h6' className='product-quantity'>
					{cartItem.quantity}
				</Typography>
			</Grid>
			<Grid
				item
				xs={4.5}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<IconButton
					className='btn-increase'
					disableRipple
					disabled={Number(cartItem.quantity) >= 99 ? true : false}
					onClick={() => {
						if (cartItem.outOfStock) {
							cartItem.outOfStock = false
							setCart(cart)
						}
						quantityIncrease(cartItem, cart, setCart, order, setOrder)
					}}
				>
					<Add fontSize='medium' sx={{ color: '#333333' }} />
				</IconButton>
			</Grid>
		</Grid>
	)
}

export default ProductQuantity
