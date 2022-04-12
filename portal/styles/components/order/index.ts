import { Box } from '@mui/material'
import { styled } from '@mui/system'
export const CartSideSummaryContainer = styled(Box)({
	border: '10px solid #EEEEEE',
	padding: '25px 25px 40px 25px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	'& .header': {
		'& .title': {
			fontSize: '28px',
			fontWeight: 600,
			lineHeight: '40px',
			marginBottom: '10px'
		}
	},
	'& .summary': {
		marginTop: '25px',
		'& .label': {
			'& h6': {
				lineHeight: '40px'
			}
		},
		'& .shipping-label': { marginBottom: '25px' },
		'& .value': {
			'& p': {
				textAlign: 'right',
				lineHeight: '40px',
				whiteSpace: 'nowrap'
			}
		}
	},
	'& .btn-next-step': {
		margin: '70px 0 35px',
		padding: '10px 100px',
		borderRadius: '5px',
		backgroundColor: '#FF8800',
		color: '#ffffff',
		fontSize: 20,
		lineHeight: '30px',
		textTransform: 'none',
		'&:hover': {
			backgroundColor: '#FF8800'
		}
	}
})
