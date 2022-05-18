import connectDB from 'middleware/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseStatus } from 'constant'
import { corsHandler } from 'services/corsHandler'
import ProductModel from 'models/mongodb/product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await corsHandler(req, res)
	const { name, price, originalPrice, category, stock } =
		req.body.productInformation
	const { imageUrls } = req.body
	try {
		const product = new ProductModel({
			name,
			price: price.toFixed(2),
			originalPrice: originalPrice.toFixed(2),
			coverImage: imageUrls[0],
			images: JSON.stringify(imageUrls),
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
