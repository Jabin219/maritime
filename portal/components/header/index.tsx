import { AppBar, Grid, Badge } from '@mui/material'
import Image from 'next/image'
import { CustomGrid } from 'styles/components/header'
import { ShoppingCart } from '@mui/icons-material'
import CategoriesNavBar from '../categoriesNavBar'
import CustomLink from '../customLink'
import { useContext } from 'react'
import { ProductContext } from 'context/ProductContextProvider'
import { useRouter } from 'next/router'
import ClientOnly from 'components/clientOnly'
import { Product } from 'models'

const Header = () => {
	const router = useRouter()
	const { cart, setOrderStep } = useContext(ProductContext)
	const getCartCount = () => {
		let count = 0
		cart.forEach((cartItem: Product) => {
			count += Number(cartItem.quantity)
		})
		return count
	}
	return (
		<AppBar position='static' color='secondary' sx={{ boxShadow: 'none' }}>
			<Grid
				container
				sx={{ margin: '13px 13px 0', borderBottom: '1px solid #ADADAD' }}
			>
				<Grid item xs>
					<CustomLink href='/'>
						<Image
							src='/images/logo/header-logo.jpg'
							alt='logo'
							width={155}
							height={95}
						/>
					</CustomLink>
				</Grid>
				<CustomGrid item sx={{ display: 'flex', alignItems: 'center' }} xs={10}>
					<CategoriesNavBar />
				</CustomGrid>
				<CustomGrid item xs>
					<ClientOnly>
						<Badge
							badgeContent={getCartCount()}
							color='primary'
							invisible={false}
						>
							<ShoppingCart
								sx={{ cursor: 'pointer' }}
								onClick={() => {
									router.push('/order')
									setOrderStep(0)
								}}
							/>
						</Badge>
					</ClientOnly>
				</CustomGrid>
			</Grid>
		</AppBar>
	)
}

export default Header
