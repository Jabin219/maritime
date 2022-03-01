import {
	AppBar,
	Box,
	Grid,
	InputAdornment,
	Tabs,
	TextField
} from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { CustomTab, CustomGrid, HeaderButton } from './style'
import { Search, ShoppingCart } from '@mui/icons-material'
import CategoriesNavBar from '../CategoriesNavBar'
function Header() {
	return (
		<AppBar position='static' color='secondary' sx={{ boxShadow: 'none' }}>
			<Grid
				container
				sx={{ margin: '13px', borderBottom: '1px solid #ADADAD' }}
			>
				<Grid item xs={1}>
					<LazyLoadImage
						src='/images/logo/header-logo.png'
						alt='logo'
						width={155}
						height={95}
					/>
				</Grid>
				<CustomGrid item sx={{ display: 'flex', alignItems: 'center' }} xs>
					<Box>
						<Tabs className='nav' value={false} indicatorColor='secondary'>
							<CustomTab value='home' label='HOME'></CustomTab>
							<CustomTab value='about' label='ABOUT'></CustomTab>
							<CustomTab value='service' label='SERVICE'></CustomTab>
							<CustomTab value='contact' label='CONTACT'></CustomTab>
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
					<HeaderButton
						sx={{
							backgroundColor: '#EEEEEE',
							color: '#333333',
							marginRight: '2vw'
						}}
					>
						Log in
					</HeaderButton>
					<HeaderButton sx={{ backgroundColor: '#FF8800', color: '#ffffff' }}>
						Sign up
					</HeaderButton>
				</CustomGrid>
			</Grid>
			<CategoriesNavBar />
		</AppBar>
	)
}

export default Header
