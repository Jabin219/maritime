import mongoose from 'mongoose'
const Schema = mongoose.Schema

const orderSchema = new Schema(
	{
		products: {
			type: String,
			required: true
		},
		subtotal: {
			type: Number,
			required: true
		},
		tax: {
			type: Number,
			required: true
		},
		total: {
			type: Number,
			required: true
		},
		contactInformation: {
			type: String,
			required: true
		},
		paymentMethod: {
			type: String,
			required: true,
			default: 'credit-card'
		},
		shippingMethod: {
			type: String,
			required: true,
			default: 'pickup'
		},
		status: {
			type: String,
			required: true,
			default: 'unpaid'
		},
		pickupNumber: {
			type: String,
			required: true
		},
		expireDate: {
			type: Date,
			required: false
		}
	},
	{ timestamps: true }
)

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export default Order
