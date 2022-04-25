import { Box, Grid, List, ListItem } from '@mui/material'
import Image from 'next/image'
import { FooterListTitle, FooterTypography } from 'styles/components/footer'
import {
	FooterSupportLinks,
	FooterQuickLinks
} from 'constant/components/footer'
import CustomLink from '../customLink'

const Footer = () => {
	return (
		<Box sx={{ height: 600, backgroundColor: '#222222' }}>
			<Grid
				container
				sx={{ width: '80%', margin: '0 auto', padding: '110px 0' }}
			>
				<Grid item xs>
					<Box>
						<Image
							src='/images/logo/footer-logo.jpg'
							alt='logo'
							width={231}
							height={159}
						/>
						<Box sx={{ marginTop: '30px', color: '#fff' }}>
							<FooterTypography sx={{ marginBottom: '10px' }}>
								50 Tacoma Dr, Dartmouth, NS, B2W 3E6
							</FooterTypography>
							<FooterTypography>maritimehousehold@gmail.com</FooterTypography>
						</Box>
					</Box>
				</Grid>
				<Grid item xs>
					<List sx={{ paddingTop: 0 }}>
						<ListItem sx={{ paddingTop: 0 }}>
							<FooterListTitle variant='h3'>Support</FooterListTitle>
						</ListItem>
						{FooterSupportLinks.map((item, index) => (
							<ListItem key={index}>
								<CustomLink href={item.link}>
									<FooterTypography>{item.label}</FooterTypography>
								</CustomLink>
							</ListItem>
						))}
					</List>
				</Grid>
				<Grid item xs>
					<List sx={{ paddingTop: 0 }}>
						<ListItem sx={{ paddingTop: 0 }}>
							<FooterListTitle variant='h3'>Quick Links</FooterListTitle>
						</ListItem>
						{FooterQuickLinks.map((item, index) => (
							<ListItem key={index}>
								<CustomLink href={item.link}>
									<FooterTypography>{item.label}</FooterTypography>
								</CustomLink>
							</ListItem>
						))}
					</List>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Footer
