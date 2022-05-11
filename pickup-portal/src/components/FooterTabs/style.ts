import { Box } from '@mui/material'
import { styled } from '@mui/system'
export const FooterTabsContainer = styled(Box)({
	position: 'fixed',
	backgroundColor: '#ffffff',
	bottom: 0,
	width: '100%',
	maxWidth: 1000,
	boxShadow: '0px -2px 12px rgba(0, 0, 0, 0.1)',
	'& button': {
		textTransform: 'none',
		fontSize: '10px',
		color: '#ADADAD',
		'& .MuiSvgIcon-root': {
			fontSize: '30px'
		}
	}
})
