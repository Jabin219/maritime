import connectDB from 'middleware/mongodb'
import OrderModel from 'models/mongodb/order'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
	generatePickupNumber,
	orderCalculator,
	checkProductsStock,
	loadOrderedProducts
} from 'services/orderHandler'
import { createPaymentIntent } from 'services/stripeHandler'
import { ResponseStatus, PaymentMethod, OrderStatus } from 'constant'
import ProductModel from 'models/mongodb/product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { orderedProducts, contactInformation, paymentMethod, shippingMethod } =
		req.body
	const products = await loadOrderedProducts(orderedProducts)
	const checkProductsStockResult = await checkProductsStock(products)
	if (checkProductsStockResult.length > 0) {
		res.status(200).json({
			status: ResponseStatus.OUT_OF_STOCK,
			message: 'One or more items in your cart are out of stock.',
			products: checkProductsStockResult
		})
		return
	}
	const { subtotal, tax, total } = await orderCalculator(products)
	const pickupNumber = generatePickupNumber()
	const orderStatus =
		paymentMethod === PaymentMethod.payAtPickup
			? OrderStatus.reserved
			: OrderStatus.unpaid
	const orderReversedDaysNumber = 4
	if (req.method === 'POST') {
		try {
			const order = new OrderModel({
				products: JSON.stringify(products),
				subtotal,
				tax,
				total,
				contactInformation: contactInformation,
				paymentMethod,
				pickupNumber,
				shippingMethod,
				status: orderStatus
			})
			const orderAddedResult = await order.save()
			if (paymentMethod === PaymentMethod.creditCard) {
				const intent = await createPaymentIntent(
					total,
					orderAddedResult._id.toString(),
					JSON.stringify(orderedProducts)
				)
				if (!intent.client_secret) {
					res.json({ status: ResponseStatus.ERROR, message: 'Payment failed' })
					return
				}
				res.status(200).json({
					status: ResponseStatus.SUCCESS,
					order: orderAddedResult,
					intentSecret: intent.client_secret
				})
				return
			} else if (paymentMethod === PaymentMethod.payAtPickup) {
				orderedProducts.forEach(
					async (product: { productId: string; quantity: number }) => {
						const selectedProductResult: any = await ProductModel.findOne({
							_id: product.productId
						})
						selectedProductResult.stock =
							selectedProductResult.stock - product.quantity
						await selectedProductResult.save()
					}
				)
				const expiredDate = new Date().setDate(
					new Date().getDate() + orderReversedDaysNumber
				)
				await OrderModel.findOneAndUpdate(
					{
						_id: orderAddedResult._id.toString()
					},
					{
						expiredDate
					}
				)
			}
			res.status(200).json({
				status: ResponseStatus.SUCCESS,
				order: orderAddedResult
			})
		} catch (err) {
			console.error(err)
			res.status(500).json({ status: ResponseStatus.FAIL, message: err })
		}
	} else {
		res.status(400).json({
			status: ResponseStatus.FAIL,
			message: 'incorrect request method'
		})
	}
}
export default connectDB(handler)
