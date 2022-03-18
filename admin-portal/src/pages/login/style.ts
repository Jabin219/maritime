import { Box } from '@mui/material'
import { styled } from '@mui/system'
export const LoginContainer = styled(Box)({
	'& .login-left': {
		marginTop: '150px',
		'& img': {
			display: 'block',
			margin: '0 auto',
			marginBottom: '50px'
		},
		'& hr': {
			borderBottom: '1px solid #333333',
			width: '60%',
			margin: '0 auto'
		}
	}
})
