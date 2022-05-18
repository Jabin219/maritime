import { Box } from '@mui/material'
import { styled } from '@mui/system'
export const LoginContainer = styled(Box)({
	'& .login-left': {
		marginTop: '150px',
		'& hr': {
			borderBottom: '1px solid #333333',
			width: '60%',
			margin: '0 auto',
			marginBottom: '70px'
		},
		'& .input-container': {
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: '50px',
			'& label': {
				marginRight: '15px',
				fontSize: 20,
				fontWeight: 400
			}
		},
		'& button': {
			display: 'block',
			margin: '0 auto',
			marginTop: '80px',
			padding: '10px 40px',
			color: '#ffffff',
			fontWeight: 700,
			fontSize: 20,
			lineHeight: '30px',
			borderRadius: '5px'
		}
	},
	'& .login-right': {
		backgroundImage: 'url(/images/admin/main/login.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		height: '100vh'
	}
})
