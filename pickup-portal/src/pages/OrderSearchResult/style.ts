import { Card } from '@mui/material'
import { styled } from '@mui/system'
export const OrderCard = styled(Card)({
	width: '90%',
	margin: '0 auto',
	marginTop: '20px',
	borderRadius: '10px',
	boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1);',
	'& .order-information-container': {
		marginBottom: '5px',
		'& .order-information-label': {
			fontFamily: 'Inter',
			fontWeight: 600
		}
	}
})
