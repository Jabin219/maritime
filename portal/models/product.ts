import mongoose from 'mongoose'
const Schema = mongoose.Schema

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		originalPrice: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		images: {
			type: String,
			required: true
		},
		inStock: { type: Boolean, required: true }
	},
	{ timestamps: true }
)

const Product =
	mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
