import {
	TableCell,
	Typography,
	TableBody,
	TableHead,
	TableRow,
	Grid,
	IconButton,
	Table,
	Box
} from '@mui/material'
import { useContext } from 'react'
import { FlexBox } from 'components/customStyle'
import { ProductContext } from 'context/ProductContextProvider'
import Image from 'next/image'
import { Product } from 'models'
import { ShoppingCartContainer } from 'styles/components/order'
import { Remove, Add, Delete } from '@mui/icons-material'
import {
	quantityIncrease,
	countCartTotal,
	itemRemove,
	quantityDecrease
} from 'utils/cartHandler'
import { priceFormatter } from 'utils'
import CustomLink from 'components/customLink'
import { OrderContext } from 'context/OrderContextProvider'

const ShoppingCart = () => {
	const { cart, setCart } = useContext(ProductContext)
	const { order, setOrder } = useContext(OrderContext)
	return (
		<>
			{typeof window !== 'undefined' && (
				<ShoppingCartContainer>
					{cart.length === 0 ? (
						<FlexBox className='empty-cart-container'>
							<FlexBox className='image-container'>
								<Image
									src='/images/order/empty-cart.png'
									alt='empty-cart'
									width={158}
									height={175}
									layout='fixed'
								/>
							</FlexBox>
							<Typography>
								Your cart is currently empty. &nbsp;
								<CustomLink href='/product-list/all-products'>
									Go Shopping
								</CustomLink>
							</Typography>
						</FlexBox>
					) : (
						<Box>
							<FlexBox className='table-container'>
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
															{cartItem.outOfStock && (
																<Typography sx={{ color: '#FF0000' }}>
																	Out of stock
																</Typography>
															)}
															<Delete
																className='icon-delete'
																fontSize='medium'
																onClick={() => {
																	itemRemove(
																		cartItem,
																		cart,
																		setCart,
																		order,
																		setOrder
																	)
																}}
															/>
														</Grid>
													</Grid>
												</TableCell>
												<TableCell>
													<Typography className='product-price'>
														${priceFormatter(Number(cartItem.price))}
													</Typography>
												</TableCell>
												<TableCell className='product-quantity-container'>
													<Grid
														container
														className='product-quantity-detail'
														sx={{ border: '1px solid #ADADAD' }}
													>
														<Grid
															item
															xs={4.5}
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
																	Number(cartItem.quantity) <= 1 ? true : false
																}
																onClick={() => {
																	quantityDecrease(
																		cartItem,
																		cart,
																		setCart,
																		order,
																		setOrder
																	)
																}}
															>
																<Remove
																	fontSize='medium'
																	sx={{ color: '#333333' }}
																/>
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
																className='product-quantity'
															>
																{cartItem.quantity}
															</Typography>
														</Grid>
														<Grid
															item
															xs={4.5}
															sx={{
																display: 'flex',
																alignItems: 'center',
																justifyContent: 'center'
															}}
														>
															<IconButton
																className='btn-increase'
																disableRipple
																disabled={
																	Number(cartItem.quantity) >= 99 ? true : false
																}
																onClick={() => {
																	quantityIncrease(
																		cartItem,
																		cart,
																		setCart,
																		order,
																		setOrder
																	)
																}}
															>
																<Add
																	fontSize='medium'
																	sx={{ color: '#333333' }}
																/>
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
							<FlexBox className='subtotal-container'>
								<Typography variant='h6'>
									Subtotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<span>${priceFormatter(countCartTotal(cart))}</span>
								</Typography>
							</FlexBox>
						</Box>
					)}
				</ShoppingCartContainer>
			)}
		</>
	)
}
export default ShoppingCart
