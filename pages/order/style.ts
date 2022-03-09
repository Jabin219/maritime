import { Box } from '@mui/material'
import { styled } from '@mui/system'

export const ShoppingCartContainer = styled(Box)({
	border: '10px solid #EEEEEE',
	'.table-container': {
		width: '95%',
		margin: '0 auto',
		'& table': {
			marginTop: '20px'
		}
	},
	'& th': {
		fontSize: 20,
		fontWeight: 600,
		lineHeight: '28px'
	},
	'& button': {
		width: '100%'
	},
	'& dev, td': {
		fontSize: 20,
		lineHeight: '28px'
	},
	'& h6': {
		lineHeight: '60px'
	},
	'& td': {
		verticalAlign: 'top'
	},
	'& .product-name, .product-price, .product-subtotal': {
		paddingTop: '17px'
	},
	'& .product-name': {
		position: 'relative',
		'& .icon-delete': {
			position: 'absolute',
			left: '-0.3vw',
			bottom: '10px',
			cursor: 'pointer'
		}
	},
	'& .product-quantity': {
		fontSize: 20,
		lineHeight: '30px',
		fontFamily: 'Myriad Pro'
	},
	'& .subtotal-container': {
		padding: '20px 0',
		alignItems: 'flex-end',
		marginRight: '6.5vw',
		'& span': {
			fontWeight: 400
		}
	},
	'& .empty-cart-container': {
		padding: '170px 350px 265px',
		'& .image-container': {
			marginBottom: '60px'
		},
		'& p': {
			whiteSpace: 'nowrap',
			'& a': {
				textDecoration: 'underline'
			}
		}
	}
})
