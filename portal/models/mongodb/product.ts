import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const productSchema = new Schema(
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
		coverImage: {
			type: String,
			required: true
		},
		images: {
			type: String,
			required: true
		},
		category: {
			type: String,
			required: false
		},
		stock: {
			type: Number,
			required: true,
			default: 10
		}
	},
	{ timestamps: true }
)
const ProductModel =
	mongoose.models.Product || mongoose.model('Product', productSchema)

export default ProductModel
