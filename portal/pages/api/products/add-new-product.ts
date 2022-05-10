import connectDB from 'middleware/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'
import { ResponseStatus } from 'constant'
import { corsHandler } from 'services/corsHandler'
import { v4 as uuidv4 } from 'uuid'
import ProductModel from 'models/mongodb/product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await corsHandler(req, res)
	const { name, price, originalPrice, images, category, stock } =
		req.body.productInformation
	const imageBase64Urls = images.map((image: any) => image.data_url)
	AWS.config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_ACCESS_SECRET,
		region: process.env.AWS_REGION
	})
	const s3 = new AWS.S3()
	const imageUrls: string[] = []
	imageBase64Urls.forEach(async (imageBase64Url: string) => {
		const base64Data = Buffer.from(
			imageBase64Url.replace(/^data:image\/\w+;base64,/, ''),
			'base64'
		)
		const data = {
			Key: uuidv4(),
			Body: imageBase64Url,
			ContentEncoding: 'base64'
		}
		// Getting the file type, ie: jpeg, png or gif
		const fileType = imageBase64Url.split(';')[0].split('/')[1]
		const params = {
			Bucket: process.env.AWS_BUCKET as string,
			Key: `${uuidv4()}.${fileType}`, // type is not required
			Body: base64Data,
			ACL: 'public-read',
			ContentEncoding: 'base64', // required
			ContentType: `image/${fileType}` // required. Notice the back ticks
		}

		// The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
		// see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
		let location = ''
		let key = ''
		try {
			const { Location, Key } = await s3.upload(params).promise()
			location = Location
			key = Key
		} catch (error) {
			console.error(error)
		}
		imageUrls.push(location)
	})
	try {
		const product = new ProductModel({
			name,
			price,
			originalPrice,
			coverImage: imageUrls[0],
			images: imageUrls,
			category,
			stock
		})
		const productAddedResult = await product.save()
		res
			.status(200)
			.json({ status: ResponseStatus.SUCCESS, product: productAddedResult })
	} catch (error) {
		console.error(error)
		res.status(500)
	}
}

export default connectDB(handler)
