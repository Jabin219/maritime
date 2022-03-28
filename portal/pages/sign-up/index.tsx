import { Box, Typography, TextField } from '@mui/material'
import { signUpInputLabels } from 'constant/pages/sign-up'
import { SignUpButton } from 'styles/pages/sign-up'

const SignUp = () => {
	return (
		<Box
			className='sign-up-page'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center'
			}}
		>
			<Box
				className='text-container'
				sx={{ marginTop: '60px', marginBottom: '120px' }}
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
					Easily Sign up
				</Typography>
				<Typography
					sx={{ textAlign: 'center', width: '35%', margin: '0 auto' }}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Typography>
			</Box>
			<Box className='sign-up-form' sx={{ width: '28%', margin: '0 auto' }}>
				{signUpInputLabels.map((item, index) => (
					<Box key={index} sx={{ marginBottom: '50px' }}>
						<Typography sx={{ marginBottom: '10px', fontWeight: 700 }}>
							{item.label}
						</Typography>
						<TextField fullWidth size='small'></TextField>
					</Box>
				))}
			</Box>
			<SignUpButton disabled>Sign up</SignUpButton>
		</Box>
	)
}

export default SignUp
