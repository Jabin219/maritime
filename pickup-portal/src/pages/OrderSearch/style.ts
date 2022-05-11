import { Box } from '@mui/material'
import { styled } from '@mui/system'
export const OrderSearchContainer = styled(Box)({
	width: '80%',
	margin: '0 auto',
	paddingTop: '100px',
	'& button': {
		display: 'block',
		fontSize: 14,
		fontWeight: 700,
		textTransform: 'none',
		borderRadius: '8px',
		padding: '10px 120px',
		margin: '50px auto'
	}
})
