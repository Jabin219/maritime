import { Box, Grid, List, ListItem } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FooterListTitle, FooterTypography } from './style'
import Link from 'next/link'
import { footerSupportList, footerQuickLinksList } from './constant'

function Footer() {
	return (
		<Box sx={{ height: 600, backgroundColor: '#222222' }}>
			<Grid
				container
				sx={{ width: '80%', margin: '0 auto', padding: '110px 0' }}
			>
				<Grid item xs>
					<Box>
						<LazyLoadImage
							src='/images/logo/footer-logo.png'
							alt='logo'
							width={231}
							height={159}
						/>
						<Box sx={{ marginTop: '30px', color: '#fff' }}>
							<FooterTypography>Halifax, NS B0B 1T1</FooterTypography>
							<FooterTypography>info@maritimehouseholds.ca</FooterTypography>
						</Box>
					</Box>
				</Grid>
				<Grid item xs>
					<List sx={{ paddingTop: 0 }}>
						<ListItem sx={{ paddingTop: 0 }}>
							<FooterListTitle variant='h3'>Support</FooterListTitle>
						</ListItem>
						{footerSupportList.map((item, index) => (
							<ListItem key={index}>
								<a href='#'>
									<Link href='/'>
										<FooterTypography>{item.label}</FooterTypography>
									</Link>
								</a>
							</ListItem>
						))}
					</List>
				</Grid>
				<Grid item xs>
					<List sx={{ paddingTop: 0 }}>
						<ListItem sx={{ paddingTop: 0 }}>
							<FooterListTitle variant='h3'>Quick Links</FooterListTitle>
						</ListItem>
						{footerQuickLinksList.map((item, index) => (
							<ListItem key={index}>
								<a href='#'>
									<Link href='/'>
										<FooterTypography>{item.label}</FooterTypography>
									</Link>
								</a>
							</ListItem>
						))}
					</List>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Footer