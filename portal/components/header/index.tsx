import { AppBar, Box, Grid, Tabs, Badge } from '@mui/material'
import Image from 'next/image'
import { CustomTab, CustomGrid } from 'styles/components/header'
import { ShoppingCart } from '@mui/icons-material'
import CategoriesNavBar from '../categoriesNavBar'
import { HeaderLinks } from 'constant/components/header'
import CustomLink from '../customLink'
import { useContext } from 'react'
import { ProductContext } from 'context/ProductContextProvider'
import { useRouter } from 'next/router'
import ClientOnly from 'components/clientOnly'
	
const Header = () => {
	const router = useRouter()
	const { cart } = useContext(ProductContext)
	return (
		<AppBar
			position='static'
			color='secondary'
			sx={
				router.pathname.startsWith('/admin')
					? { display: 'none' }
					: { boxShadow: 'none' }
			}
		>
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
				<CustomGrid item sx={{ display: 'flex', alignItems: 'center' }} xs={10}>
					<Box>
						<Tabs
							className='nav'
							value={false}
							indicatorColor='secondary'
							centered
						>
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
				<CustomGrid item xs>
					<ClientOnly>
						<Badge badgeContent={cart.length} color='primary' invisible={false}>
							<ShoppingCart
								sx={{ cursor: 'pointer' }}
								onClick={() => {
									router.push('/order')
								}}
							/>
						</Badge>
					</ClientOnly>
				</CustomGrid>
			</Grid>
			<CategoriesNavBar />
		</AppBar>
	)
}

export default Header
