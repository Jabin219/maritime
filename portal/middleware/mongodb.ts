import mongoose from 'mongoose'

const connectDB = (handler: any) => async (req: Request, res: Response) => {
	if (mongoose.connections[0].readyState) {
		// Use current db connection
		return handler(req, res)
	}
	// Use new db connection
	const connectDBUrl = process.env.MONGODB_URL as string
	await mongoose
		.connect(connectDBUrl)
		.then(() => {
			console.log('===================connect database!===================')
		})
		.catch(err => {
			console.error(err)
		})
	return handler(req, res)
}

export default connectDB
