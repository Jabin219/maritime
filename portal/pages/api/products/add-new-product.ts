import connectDB from 'middleware/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'
import { ResponseStatus } from 'constant'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(req.body)
	const { name, price, originalPrice, images, category, stock } = req.body
	const s3 = new AWS.S3({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_ACCESS_SECRET,
		region: process.env.AWS_REGION,
		signatureVersion: 'v4'
	})
	const uploadParams: AWS.S3.PresignedPost.Params = {
		Bucket: `${process.env.AWS_BUCKET_NAME}`,
		Fields: {
			key: req.query.file
		},
		Expires: 60, // seconds
		Conditions: [['content-length-range', 0, 1048576]] // up to 1 MB
	}
	if (req.method === 'POST') {
		// 	try {
		// 		const product = new Product({
		// 			name,
		// 			price,
		// 			originalPrice,
		// 			coverImage: images[0],
		// 			images,
		// 			category,
		// 			stock
		// 		})
		// 		const productAddedResult = await product.save()
		res.status(200).json({ status: ResponseStatus.SUCCESS })
		// 	} catch (error) {
		// 		console.error(error)
		// 		res.status(500)
	} else {
		res.status(422).send('req_method_not_supported')
	}
}

export default connectDB(handler)
