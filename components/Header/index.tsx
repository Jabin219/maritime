import {
	AppBar,
	Box,
	Grid,
	InputAdornment,
	Tabs,
	TextField
} from '@mui/material'
import Image from 'next/image'
import { CustomTab, CustomGrid, HeaderButton } from './style'
import { Search, ShoppingCart } from '@mui/icons-material'
import CategoriesNavBar from '../CategoriesNavBar'
import Link from 'next/link'
import { HeaderLinks } from './constant'
function Header() {
	return (
		<AppBar position='static' color='secondary' sx={{ boxShadow: 'none' }}>
			<Grid
				container
				sx={{ margin: '13px 13px 0', borderBottom: '1px solid #ADADAD' }}
			>
				<Grid item xs={1}>
					<Link href='/' passHref={true}>
						<a>
							<Image
								src='/images/logo/header-logo.png'
								alt='logo'
								width={155}
								height={95}
							/>
						</a>
					</Link>
				</Grid>
				<CustomGrid item sx={{ display: 'flex', alignItems: 'center' }} xs>
					<Box>
						<Tabs className='nav' value={false} indicatorColor='secondary'>
							{HeaderLinks.map((item, index) => (
								<Link key={index} href={item.link}>
									<a>
										<CustomTab
											key={index}
											value={item.value}
											label={item.label}
										></CustomTab>
									</a>
								</Link>
							))}
						</Tabs>
					</Box>
				</CustomGrid>
				<CustomGrid item xs={3}>
					<TextField
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search />
								</InputAdornment>
							)
						}}
					></TextField>
				</CustomGrid>
				<CustomGrid item xs={0.5}>
					<ShoppingCart />
				</CustomGrid>
				<CustomGrid item xs={2} sx={{ marginRight: '2vw' }}>
					<Link href='/login'>
						<HeaderButton
							sx={{
								backgroundColor: '#EEEEEE',
								color: '#333333',
								marginRight: '2vw'
							}}
						>
							<a>Log in</a>
						</HeaderButton>
					</Link>
					<Link href='/sign-up'>
						<HeaderButton sx={{ backgroundColor: '#FF8800', color: '#ffffff' }}>
							<a>Sign up</a>
						</HeaderButton>
					</Link>
				</CustomGrid>
			</Grid>
			<CategoriesNavBar />
		</AppBar>
	)
}

export default Header
