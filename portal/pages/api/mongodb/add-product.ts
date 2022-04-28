import connectDB from '../middleware/mongodb'
import Product from 'models/mongodb/product'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { name, price, originalPrice, coverImage, images, category, stock } =
		req.body
	if (req.method === 'POST') {
		try {
			const product = new Product({
				name,
				price,
				originalPrice,
				coverImage,
				images,
				category,
				stock
			})
			const productAddedResult = await product.save()
			res.send(productAddedResult)
		} catch (error) {
			console.error(error)
			res.status(500)
		}
	} else {
		res.status(422).send('req_method_not_supported')
	}
}

export default connectDB(handler)
