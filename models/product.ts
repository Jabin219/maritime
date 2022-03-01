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
		description: {
			type: String,
			required: true
		},
		images: {
			type: String,
			required: true
		},
		inStock: { type: String, required: true }
	},
	{ timestamps: true }
)

const User = mongoose.model('Product', productSchema)

export default User
