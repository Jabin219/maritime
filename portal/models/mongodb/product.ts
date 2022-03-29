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
		status: {
			type: String,
			required: true,
			default: 'inStock'
		},
		stock: {
			type: Number,
			required: true,
			default: 10
		}
	},
	{ timestamps: true }
)

const Product =
	mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
