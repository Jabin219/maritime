import { Box, Typography, TextField, Button } from '@mui/material'
import { LoginButton } from './style'

function Login() {
	return (
		<Box
			className='login-page'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center'
			}}
		>
			<Box
				className='text-container'
				sx={{ marginTop: '60px', marginBottom: '55px' }}
			>
				<Typography
					variant='h2'
					sx={{
						fontWeight: 900,
						fontSize: 40,
						textAlign: 'center',
						marginBottom: '25px'
					}}
				>
					Log in
				</Typography>
			</Box>
			<Box className='sign-up-form' sx={{ width: '28%', margin: '0 auto' }}>
				<Box sx={{ marginBottom: '50px' }}>
					<Typography sx={{ marginBottom: '10px', fontWeight: 700 }}>
						Email Address
					</Typography>
					<TextField fullWidth size='small'></TextField>
				</Box>
				<Box>
					<Typography sx={{ marginBottom: '10px', fontWeight: 700 }}>
						Password
					</Typography>
					<TextField fullWidth size='small'></TextField>
				</Box>
			</Box>
			<LoginButton disabled>Login</LoginButton>
		</Box>
	)
}

export default Login
