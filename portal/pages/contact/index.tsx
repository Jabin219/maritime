import { Box, Typography, Grid, TextField } from '@mui/material'
import { SubPageButton } from 'components/customStyle'
import PageBanner from 'components/pageBanner'
import { contactInputLabels } from 'constant/pages/contact'

const Contact = () => {
	return (
		<Box className='contact-page' sx={{ minHeight: 1500 }}>
			<PageBanner
				pageTitle='Contact us'
				pageDescription='All of our products are authentic, guaranteed'
				bannerUrl='/images/contact/contact-banner.jpg'
			/>
			<Box className='contact-main-body' sx={{ marginTop: '100px' }}>
				<Grid
					container
					sx={{
						maxWidth: '60%',
						margin: '0 auto',
						'& h2,p': { textAlign: 'center' },
						'& h2': {
							marginBottom: '30px'
						}
					}}
				>
					<Grid item xs>
						<Typography variant='h2'>Location</Typography>
						<Typography>50 Tacoma Dr, Dartmouth, NS, B2W 3E6</Typography>
					</Grid>
					<Grid item xs>
						<Typography variant='h2'>E-mail</Typography>
						<Typography>maritimehousehold@gmail.com</Typography>
					</Grid>
				</Grid>
				<Box
					className='contact-form-container'
					sx={{ width: '50%', margin: '0 auto', marginTop: '80px' }}
				>
					{contactInputLabels.map((item, index) => (
						<Box key={index} sx={{ marginBottom: '50px' }}>
							<Typography sx={{ marginBottom: '10px', fontWeight: 700 }}>
								{item.label}
							</Typography>
							<TextField fullWidth size='small'></TextField>
						</Box>
					))}
				</Box>
				<SubPageButton disableElevation>SEND</SubPageButton>
			</Box>
		</Box>
	)
}

export default Contact
