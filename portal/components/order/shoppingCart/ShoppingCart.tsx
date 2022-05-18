import {
	TableCell,
	Typography,
	TableBody,
	TableHead,
	TableRow,
	Grid,
	Table,
	Box
} from '@mui/material'
import { useContext } from 'react'
import { FlexBox } from 'components/customStyle'
import { ProductContext } from 'context/ProductContextProvider'
import Image from 'next/image'
import { Product } from 'models'
import { ShoppingCartContainer } from 'styles/components/order'
import { Delete } from '@mui/icons-material'
import { countCartTotal, itemRemove } from 'utils/cartHandler'
import { priceFormatter } from 'utils'
import { OrderContext } from 'context/OrderContextProvider'
import EmptyCart from './EmptyCart'
import ProductQuantity from './ProductQuantity'
const ShoppingCart = () => {
	const { cart, setCart } = useContext(ProductContext)
	const { order, setOrder } = useContext(OrderContext)
	return (
		<>
			{typeof window !== 'undefined' && (
				<ShoppingCartContainer>
					{cart.length === 0 ? (
						<EmptyCart />
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
														<Grid item xs={3}>
															<Image
																src={cartItem.coverImage}
																alt='product-image'
																width={200}
																height={200}
															/>
														</Grid>
														<Grid className='product-name' item xs={9}>
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
													<ProductQuantity
														cartItem={cartItem}
														cart={cart}
														setCart={setCart}
														order={order}
														setOrder={setOrder}
													/>
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
