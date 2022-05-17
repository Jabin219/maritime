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
	},
	'& .product-info': {
		'& .product-image': {
			'& img': {
				width: '80%'
			}
		},
		'& .product-name': {
			textAlign: 'left',
			fontWeight: 900,
			marginBottom: '40px'
		},
		'& .product-original-price': {
			fontWeight: 500,
			fontSize: 40,
			color: '#ADADAD',
			textDecoration: 'line-through',
			marginBottom: '15px'
		},
		'& .product-price': { fontWeight: 700, fontSize: 40, color: '#FF8800' }
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
		marginTop: '10px',
		cursor: 'pointer'
	},
	'& .product-price': {
		color: '#FF8800'
	}
})
