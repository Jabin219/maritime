import {
	TableCell,
	Typography,
	TableBody,
	TableHead,
	TableRow,
	Grid,
	IconButton,
	Table
} from '@mui/material'
import { useContext } from 'react'
import { FlexBox } from '../../components/CustomComponents'
import { ProductContext } from '../../context/ProductContextProvider'
import Image from 'next/image'
import { Product } from '../../models'
import { CartTableContainer } from './style'
import { Remove, Add } from '@mui/icons-material'
import { saveCart, countCartTotal } from '../../utils/cartHandler'
import { priceFormatter } from '../../utils'
import { OrderContext } from '../../context/OrderContextProvider'

function ShoppingCart() {
	const { cart, setCart } = useContext(ProductContext)
	const { order, setOrder } = useContext(OrderContext)
	const quantityDecrease = (item: Product) => {
		const currentCartProducts: Product[] = [...cart]
		const findProductIndex = currentCartProducts.findIndex(
			(product: Product) =>
				product.id === item.id && Number(product.quantity) > 1
		)
		currentCartProducts[findProductIndex] &&
			(currentCartProducts[findProductIndex] as any).quantity--
		setCart(currentCartProducts)
		saveCart(currentCartProducts)
		setOrder({
			...order,
			products: currentCartProducts,
			subtotal: countCartTotal(currentCartProducts)
		})
	}
	const quantityIncrease = (item: Product) => {
		const currentCartProducts: Product[] = [...cart]
		const findProductIndex = currentCartProducts.findIndex(
			(product: Product) => product.id === item.id
		)
		currentCartProducts[findProductIndex] &&
			(currentCartProducts[findProductIndex] as any).quantity++
		setCart(currentCartProducts)
		saveCart(currentCartProducts)
		setOrder({
			...order,
			products: currentCartProducts,
			subtotal: countCartTotal(currentCartProducts)
		})
	}
	const itemRemove = (item: Product) => {
		const newProductList = cart.filter((product: Product) => {
			return product.id !== item.id
		})
		setCart(newProductList)
		saveCart(newProductList)
		setOrder({
			...order,
			products: newProductList,
			subtotal: countCartTotal(newProductList)
		})
	}
	return (
		<CartTableContainer>
			<FlexBox
				sx={{
					width: '95%',
					margin: '0 auto',
					'& table': {
						marginTop: '20px'
					}
				}}
			>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Item</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Qty</TableCell>
							<TableCell>Subtotal</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cart.map((cartItem: Product, index: number) => (
							<TableRow key={index}>
								<TableCell>
									<Grid container>
										<Grid item xs>
											<Image
												src={cartItem.coverImage}
												alt='product-image'
												width={200}
												height={200}
											/>
										</Grid>
										<Grid className='product-name' item xs>
											{cartItem.name}
										</Grid>
									</Grid>
								</TableCell>
								<TableCell>
									<Typography className='product-price'>
										${priceFormatter(Number(cartItem.price))}
									</Typography>
								</TableCell>
								<TableCell className='product-quantity'>
									<Grid
										container
										className='product-quantity-detail'
										sx={{ border: '1px solid #ADADAD' }}
									>
										<Grid
											item
											xs={5}
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<IconButton
												className='btn-decrease'
												disableRipple
												disabled={
													cartItem.quantity && cartItem.quantity < 2
														? true
														: false
												}
												onClick={() => {
													quantityDecrease(cartItem)
												}}
											>
												<Remove fontSize='medium' sx={{ color: '#333333' }} />
											</IconButton>
										</Grid>
										<Grid
											item
											xs
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<Typography
												variant='h6'
												sx={{
													fontSize: 20,
													lineHeight: '30px',
													fontFamily: 'Myriad Pro'
												}}
											>
												{cartItem.quantity}
											</Typography>
										</Grid>
										<Grid
											item
											xs={5}
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<IconButton
												className='btn-increase'
												disableRipple
												onClick={() => {
													quantityIncrease(cartItem)
												}}
											>
												<Add fontSize='medium' sx={{ color: '#333333' }} />
											</IconButton>
										</Grid>
									</Grid>
								</TableCell>
								<TableCell>
									<Typography className='product-subtotal'>
										$
										{priceFormatter(
											Number(cartItem.price) * Number(cartItem.quantity)
										)}
									</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</FlexBox>
			<FlexBox
				className='subtotal-container'
				sx={{
					padding: '20px 0',
					alignItems: 'flex-end',
					marginRight: '6.5vw'
				}}
			>
				<Typography variant='h6'>
					Subtotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span>${priceFormatter(countCartTotal(cart))}</span>
				</Typography>
			</FlexBox>
		</CartTableContainer>
	)
}

export default ShoppingCart
