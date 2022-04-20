import mongoose from 'mongoose'
const Schema = mongoose.Schema

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		showedOnHeader: {
			type: Boolean,
			required: true,
			default: true
		}
	},
	{ timestamps: true }
)

const Category =
	mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category
