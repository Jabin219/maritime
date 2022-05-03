import mongoose from 'mongoose'
const Schema = mongoose.Schema

const contactInformationSchema = new Schema({
	name: String,
	phone: String,
	email: String
})
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
			type: contactInformationSchema,
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
		expiredDate: {
			type: Date,
			required: false
		}
	},
	{ timestamps: true }
)

const OrderModel =
	// mongoose.models.Order ||
	mongoose.model('Order', orderSchema)

export default OrderModel
