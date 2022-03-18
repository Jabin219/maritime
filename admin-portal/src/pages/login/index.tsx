import { Divider, Grid, Box } from '@mui/material'
import { LoginContainer } from './style'

const Login = () => {
	return (
		<LoginContainer>
			<Grid container>
				<Grid item xs={6} className='login-left'>
					<Box>
						<img src='/images/logo/logo.jpg' alt='logo' />
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={6}>
					<img
						src='/images/main/login.jpg'
						alt='login'
						style={{ width: '100%' }}
					/>
				</Grid>
			</Grid>
		</LoginContainer>
	)
}

export default Login
