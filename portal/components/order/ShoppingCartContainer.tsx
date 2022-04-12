import { Grid } from '@mui/material'
import CartSideSummary from './CartSideSummary'
import ShoppingCart from './ShoppingCart'

const ShoppingCartContainer = () => {
	return (
		<Grid container spacing={10}>
			<Grid item xs={8}>
				<ShoppingCart />
			</Grid>
			<Grid item xs>
				<CartSideSummary />
			</Grid>
		</Grid>
	)
}

export default ShoppingCartContainer
