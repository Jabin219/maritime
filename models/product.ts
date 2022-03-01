import mongoose from 'mongoose'
var Schema = mongoose.Schema

var productSchema = new Schema(
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
		inStock: {}
	},
	{ timestamps: true }
)

var User = mongoose.model('Product', productSchema)

export default User
