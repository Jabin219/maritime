import { Box, Typography, Divider, Grid, Button } from '@mui/material'
import { useContext } from 'react'
import { OrderContext } from 'context/OrderContextProvider'
import CustomLink from 'components/customLink'
import { priceFormatter, taxCalculator } from 'utils'
import { CartSideSummaryContainer } from 'styles/components/order'
import { Categories } from 'constant'
import { ProductContext } from 'context/ProductContextProvider'
import { useRouter } from 'next/router'

const CartSideSummary = () => {
	const router = useRouter()
	const { cart } = useContext(ProductContext)
	const { order, setOrder, next } = useContext(OrderContext)
	const handleShoppingCartNext = async () => {
		setOrder({
			...order,
			tax: priceFormatter(taxCalculator(order.subtotal)),
			total: priceFormatter(order.subtotal + taxCalculator(order.subtotal)),
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
			<CustomLink href='/product-list'>
				<Typography
					onClick={() => {
						router.push(`/product-list/${Categories[0].name}`)
					}}
				>
					Continue Shopping
				</Typography>
			</CustomLink>
		</CartSideSummaryContainer>
	)
}

export default CartSideSummary
