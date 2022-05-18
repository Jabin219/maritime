import { Grid, Typography, Button } from '@mui/material'
import { styled } from '@mui/system'

const ProductListGrid = styled(Grid)({
	marginBottom: '20px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	'& .product-name': {
		marginTop: '10px',
		fontSize: 20,
		fontWeight: 600,
		textAlign: 'center'
	},
	'& .product-price': {
		color: '#FF8800',
		fontWeight: 600
	},
	'& img': {
		objectFit: 'cover'
	}
})
const ProductListTitle = styled(Typography)({
	marginTop: '80px',
	marginBottom: '50px',
	fontWeight: 900,
	fontSize: 40,
	textAlign: 'center'
})

const HomeGridButton = styled(Button)({
	padding: '12px 45px',
	color: '#ffffff',
	backgroundColor: '#FF8800',
	borderRadius: '40px',
	boxShadow: '0px 4px 10px rgba(151, 80, 0, 0.2)',
	fontSize: 20,
	lineHeight: '28px',
	fontWeight: 700,
	marginTop: '20px',
	'&:hover': {
		backgroundColor: '#FF8800'
	}
})

export { ProductListGrid, ProductListTitle, HomeGridButton }
