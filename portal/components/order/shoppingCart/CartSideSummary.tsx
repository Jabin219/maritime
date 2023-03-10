import { Box, Typography, Divider, Grid, Button } from '@mui/material'
import { useContext } from 'react'
import { OrderContext } from 'context/OrderContextProvider'
import CustomLink from 'components/customLink'
import { priceFormatter, taxCalculator } from 'utils'
import { CartSideSummaryContainer } from 'styles/components/order'
import { ProductContext } from 'context/ProductContextProvider'

const CartSideSummary = () => {
	const { cart } = useContext(ProductContext)
	const { order, setOrder, next } = useContext(OrderContext)
	const handleShoppingCartNext = async () => {
		setOrder({
			...order,
			tax: Number(taxCalculator(order.subtotal).toFixed(2)),
			total: Number(
				(order.subtotal + taxCalculator(order.subtotal)).toFixed(2)
			),
			products: cart
		})
		next()
	}
	return (
		<CartSideSummaryContainer className='cart-side-summary'>
			<Box className='header'>
				<Typography variant='h5' className='title'>
					Summary
				</Typography>
			</Box>
			<Divider />
			<Grid className='summary' container>
				<Grid item xs={7} className='label'>
					<Typography variant='h6'>Subtotal</Typography>
				</Grid>
				<Grid item xs={5} className='rightFloat value'>
					<Typography>{priceFormatter(order.subtotal)}</Typography>
				</Grid>
				<Grid item xs={7} className='label'>
					<Typography variant='h6'>Tax</Typography>
				</Grid>
				<Grid className='rightFloat value' item xs={5}>
					<Typography>TBD</Typography>
				</Grid>
				<Divider style={{ width: '100%' }} />
				<Grid item xs={7} className='label' style={{ marginTop: 20 }}>
					<Typography variant='h6' className='total'>
						Total
					</Typography>
				</Grid>
				<Grid
					className='rightFloat value'
					xs={5}
					item
					style={{ marginTop: 20 }}
				>
					<Typography className='total'>TBD</Typography>
				</Grid>
			</Grid>
			{typeof window !== 'undefined' && (
				<Button
					className='btn-next-step'
					onClick={() => {
						handleShoppingCartNext()
					}}
					disabled={cart.length < 1}
				>
					Next Step
				</Button>
			)}
			<CustomLink href='/product-list/all-products'>
				<Typography>Continue Shopping</Typography>
			</CustomLink>
		</CartSideSummaryContainer>
	)
}

export default CartSideSummary
