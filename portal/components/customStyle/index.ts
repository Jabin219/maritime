import { Box, Button } from '@mui/material'
import { styled } from '@mui/system'

export const FlexBox = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'
})
export const SubPageButton = styled(Button)({
	display: 'block',
	backgroundColor: '#FF8800',
	color: '#ffffff',
	padding: '10px 50px',
	fontSize: 20,
	fontWeight: 600,
	boxShadow: '0px 4px 10px rgba(151, 80, 0, 0.2)',
	borderRadius: '40px',
	margin: '0 auto',
	'&:hover': {
		backgroundColor: '#FF8800'
	}
})
