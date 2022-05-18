import connectDB from 'middleware/mongodb'
import OrderModel from 'models/mongodb/order'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
	generatePickupNumber,
	orderCalculator,
	checkProductsStock,
	loadOrderedProducts,
	decreaseOrderedProductsStock
} from 'services/orderHandler'
import { createPaymentIntent } from 'services/stripeHandler'
import { ResponseStatus, PaymentMethod, OrderStatus } from 'constant'
import { sendOrderConfirmation } from 'services/emailHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const {
			orderedProducts,
			contactInformation,
			paymentMethod,
			shippingMethod
		} = req.body
		try {
			const products = await loadOrderedProducts(orderedProducts)
			const checkProductsStockResult = checkProductsStock(products)
			if (checkProductsStockResult.length > 0) {
				res.status(200).json({
					status: ResponseStatus.OUT_OF_STOCK,
					message: 'One or more items in your cart are out of stock.',
					products: checkProductsStockResult
				})
				return
			}
			const { subtotal, tax, total } = orderCalculator(products)
			const pickupNumber = generatePickupNumber()
			const orderStatus =
				paymentMethod === PaymentMethod.payOnPickup
					? OrderStatus.reserved
					: OrderStatus.unpaid

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
			} else if (paymentMethod === PaymentMethod.payOnPickup) {
				await decreaseOrderedProductsStock(products)
				const emailResult = await sendOrderConfirmation(orderAddedResult)
				if (emailResult.status === ResponseStatus.ERROR) {
					res.status(200).json({
						status: ResponseStatus.ERROR,
						error: emailResult.error
					})
					return
				}
				res.status(200).json({
					status: ResponseStatus.SUCCESS,
					order: orderAddedResult
				})
			} else {
				res.status(200).json({
					status: ResponseStatus.ERROR,
					message: 'No valid payment method'
				})
			}
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
