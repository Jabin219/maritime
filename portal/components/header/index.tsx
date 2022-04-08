import {
	AppBar,
	Box,
	Grid,
	InputAdornment,
	Tabs,
	TextField
} from '@mui/material'
import Image from 'next/image'
import { CustomTab, CustomGrid, HeaderButton } from 'styles/components/header'
import { Search, ShoppingCart } from '@mui/icons-material'
import CategoriesNavBar from '../categoriesNavBar'
import { HeaderLinks } from 'constant/components/header'
import CustomLink from '../customLink'

const Header = () => {
	return (
		<AppBar position='static' color='secondary' sx={{ boxShadow: 'none' }}>
			<Grid
				container
				sx={{ margin: '13px 13px 0', borderBottom: '1px solid #ADADAD' }}
			>
				<Grid item xs>
					<CustomLink href='/'>
						<Image
							src='/images/logo/header-logo.png'
							alt='logo'
							width={155}
							height={95}
						/>
					</CustomLink>
				</Grid>
				<CustomGrid item sx={{ display: 'flex', alignItems: 'center' }} xs={4}>
					<Box>
						<Tabs className='nav' value={false} indicatorColor='secondary'>
							{HeaderLinks.map((item, index) => (
								<CustomLink key={index} href={item.link}>
									<CustomTab
										key={index}
										value={item.value}
										label={item.label}
									></CustomTab>
								</CustomLink>
							))}
						</Tabs>
					</Box>
				</CustomGrid>
				<CustomGrid item xs={3}>
					<TextField
						fullWidth
						size='small'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search />
								</InputAdornment>
							)
						}}
					></TextField>
				</CustomGrid>
				<CustomGrid item xs={1}>
					<CustomLink href='/order'>
						<ShoppingCart />
					</CustomLink>
				</CustomGrid>
				<CustomGrid item xs={3} sx={{ marginRight: '1vw' }}>
					<CustomLink href='/login'>
						<HeaderButton
							sx={{
								backgroundColor: '#EEEEEE',
								color: '#333333',
								marginRight: '2vw'
							}}
						>
							Log in
						</HeaderButton>
					</CustomLink>
					<CustomLink href='/sign-up'>
						<HeaderButton sx={{ backgroundColor: '#FF8800', color: '#ffffff' }}>
							Sign up
						</HeaderButton>
					</CustomLink>
				</CustomGrid>
			</Grid>
			<CategoriesNavBar />
		</AppBar>
	)
}

export default Header
