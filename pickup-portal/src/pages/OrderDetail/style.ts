import { Box } from '@mui/material'
import { styled } from '@mui/system'
export const OrderDetailContainer = styled(Box)({
	width: '90%',
	margin: '15px auto',
	'& .order-info': {
		marginBottom: '20px',
		'& .order-info-container': {
			marginBottom: '14px',
			'& .order-info-label': {
				fontWeight: 700
			}
		}
	},
	'& .MuiDivider-root': {
		backgroundColor: '#ADADAD'
	},
	'& .order-products': {
		marginBottom: '15px',
		'& img': { display: 'block', width: '70px', height: '70px' },
		'& .product-container': {
			width: '95%',
			margin: '20px auto 30px',
			'& .product-price, .product-quantity': {
				textAlign: 'right'
			},
			'& .product-price': {
				fontWeight: 700,
				marginBottom: '12px'
			}
		}
	},
	'& .order-summary': {
		width: '40%',
		marginLeft: 'auto',
		marginBottom: '40px',
		'& .order-summary-container': {
			marginBottom: '12px'
		},
		'& .order-summary-label': {
			fontWeight: 700
		},
		'& .order-summary-price, .order-summary-label': { textAlign: 'right' }
	},
	'& .btn-pickup': {
		display: 'block',
		padding: '11px 100px',
		margin: '0 auto',
		borderRadius: '8px',
		fontSize: 20,
		fontWeight: 700
	}
})
