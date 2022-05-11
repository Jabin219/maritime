import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
export const ProductDetailContainer = styled(Box)({
	'& .mini-img-group': {
		height: 150,
		width: 500,
		marginTop: '20px',
		overflow: 'auto',
		whiteSpace: 'nowrap',
		'& .mini-img-container': {
			display: 'inline-block',
			width: 100,
			height: 100,
			cursor: 'pointer',
			marginRight: '10px'
		}
	}
})
export const ProductButtonContainer = styled(Box)({
	marginTop: '140px',
	'& button': {
		fontFamily: 'Source Sans Pro',
		fontSize: 20,
		fontWeight: 600,
		padding: '10px 130px',
		whiteSpace: 'nowrap',
		borderRadius: '12px',
		width: '90%'
	},
	'& .add-to-cart': {
		backgroundColor: '#FF8800',
		color: '#ffffff',
		marginBottom: '30px',
		'&:hover': {
			backgroundColor: '#FF8800'
		}
	},
	'& .buy-now': {
		backgroundColor: '#EEEEEE',
		color: '#333333',
		'&:hover': {
			backgroundColor: '#EEEEEE'
		}
	}
})
export const RelatedProductsTitle = styled(Typography)({
	fontSize: 28,
	textAlign: 'center',
	lineHeight: '40px',
	fontWeight: 900,
	width: '80%',
	margin: '0 auto',
	borderBottom: '1px solid #ADADAD',
	marginBottom: '70px',
	paddingBottom: '15px'
})
export const RelatedProductGrid = styled(Grid)({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	'& img': {
		width: '80%',
		cursor: 'pointer'
	},
	'& .product-name, .product-price': {
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
