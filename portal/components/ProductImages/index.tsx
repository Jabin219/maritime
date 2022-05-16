import { Product } from 'models'
import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

interface Props {
	showedProduct: Product
	largeImage: string
	setLargeImage: (url: string) => void
}

const ProductImages = ({ showedProduct, largeImage, setLargeImage }: Props) => {
	return (
		<>
			{showedProduct && (
				<>
					<Image
						src={largeImage || showedProduct?.images[0]}
						alt='product-image'
						width={500}
						height={500}
					/>
					<Box className='mini-img-group'>
						{(showedProduct?.images as string[]).map((image: string) => (
							<Box
								key={image}
								className='mini-img-container'
								sx={{
									border: largeImage === image ? '3px solid #ff8800' : ''
								}}
								onClick={() => {
									setLargeImage(image)
								}}
							>
								<Image
									src={image}
									alt='product-image-gallery'
									width={100}
									height={100}
								/>
							</Box>
						))}
					</Box>
				</>
			)}
		</>
	)
}

export default ProductImages
