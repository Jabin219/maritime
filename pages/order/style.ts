import { Box } from '@mui/material'
import { styled } from '@mui/system'

export const CartTableContainer = styled(Box)({
	border: '10px solid #EEEEEE',
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
	'& .subtotal-container': {
		'& span': {
			fontWeight: 400
		}
	}
})
