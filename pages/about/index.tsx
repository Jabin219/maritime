import { Box, Typography } from '@mui/material'
import { SubPageButton } from '../../components/CustomComponents'
import PageBanner from '../../components/PegeBanner'

function About() {
	return (
		<Box className='about-page' sx={{ marginBottom: '200px' }}>
			<PageBanner
				pageTitle='About us'
				pageDescription=''
				bannerUrl='/images/about/about-banner.jpg'
			/>
			<Box
				className='text-container'
				sx={{ margin: '120px auto 50px', width: '50%' }}
			>
				<Typography variant='h2' sx={{ marginBottom: '50px' }}>
					Subtitle
				</Typography>
				<Typography sx={{ textAlign: 'center' }}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</Typography>
			</Box>
			<SubPageButton disableElevation>INQUIRE MORE</SubPageButton>
		</Box>
	)
}

export default About
