import { Grid, Typography, Box } from '@mui/material'
import { styled } from '@mui/system'

const ProductListContainer = styled(Box)({
	marginTop: '20px'
})
const ProductListGrid = styled(Grid)({
	marginBottom: '20px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	'& img': {
		width: '80%',
		marginBottom: '20px',
		cursor: 'pointer'
	},
	'& .product-name, .product-price': {
		fontSize: 20,
		fontWeight: 600,
		textAlign: 'center'
	},
	'& .product-name': {
		cursor: 'pointer'
	},
	'& .product-price': {
		color: '#FF8800'
	}
})
const ProductListTitle = styled(Typography)({
	marginTop: 50,
	marginBottom: 50,
	fontWeight: 900,
	fontSize: 40,
	textAlign: 'center'
})

export { ProductListGrid, ProductListTitle, ProductListContainer }
