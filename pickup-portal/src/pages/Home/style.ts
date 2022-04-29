import { Box } from '@mui/material'
import { styled } from '@mui/system'
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
		marginBottom: '30px'
	},
	'& .buy-now': {
		backgroundColor: '#EEEEEE',
		color: '#333333'
	}
})
