import mongoose from 'mongoose'
const Schema = mongoose.Schema

const accountSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
)

const Account =
	mongoose.models.Account || mongoose.model('Account', accountSchema)

export default Account
