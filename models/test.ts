import mongoose from 'mongoose'

const Schema = mongoose.Schema
const testSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String }
	},
	{ timestamps: true }
)

const Test = mongoose.model('Test', testSchema)

export default Test
