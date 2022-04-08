import {
	Divider,
	Grid,
	Box,
	InputLabel,
	TextField,
	Button
} from '@mui/material'
import { sendLoginRequest } from 'api/admin'
import Image from 'next/image'
import { useState } from 'react'
import { LoginContainer } from 'styles/pages/admin/login/style'
import { useRouter } from 'next/router'
const AdminLogin = () => {
	const router = useRouter()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)
	const handleLogin = async (username: string, password: string) => {
		const loginResult = await sendLoginRequest({ username, password })
		if (loginResult.data.status === 'success') {
			const tokenString = loginResult.data.token
			localStorage.setItem('adminToken', tokenString)
			router.reload()
		} else {
			setError(true)
		}
	}
	return (
		<LoginContainer>
			<Grid container>
				<Grid item xs={6} className='login-left'>
					<Box
						sx={{ position: 'relative', minHeight: 160, marginBottom: '50px' }}
					>
						<Image
							src='/images/admin/logo/logo.jpg'
							alt='logo'
							layout='fill'
							objectFit='contain'
						/>
					</Box>
					<Divider />
					<Grid className='input-container' container>
						<InputLabel>Username</InputLabel>
						<TextField
							size='small'
							sx={{ width: '45%' }}
							onChange={event => {
								setError(false)
								setUsername(event.target.value)
							}}
							error={error}
							helperText={error && 'Invalid username/password'}
						/>
					</Grid>
					<Grid className='input-container' container>
						<InputLabel>Password</InputLabel>
						<TextField
							size='small'
							sx={{ width: '45%' }}
							type='password'
							onChange={event => {
								setError(false)
								setPassword(event.target.value)
							}}
							error={error}
							helperText={error && 'Invalid username/password'}
						/>
					</Grid>
					<Button
						variant='contained'
						onClick={() => {
							handleLogin(username, password)
						}}
					>
						Login
					</Button>
				</Grid>
				<Grid item xs={6} className='login-right'></Grid>
			</Grid>
		</LoginContainer>
	)
}

export default AdminLogin
