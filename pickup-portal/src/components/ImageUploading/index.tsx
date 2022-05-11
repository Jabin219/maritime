import React from 'react'
import ReactImageUploading, { ImageListType } from 'react-images-uploading'
import { Add } from '@mui/icons-material'
import { UploadImage } from './style'
import { Grid, Box, Button } from '@mui/material'

const ImageUploading = ({ dispatch, productInformation }: any) => {
	const handleUploadImage = (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined
	) => {
		// data for submit
		dispatch({ type: 'CHANGE_PRODUCT_IMAGES', value: imageList as never[] })
	}
	return (
		<ReactImageUploading
			multiple
			value={productInformation.images}
			onChange={handleUploadImage}
			dataURLKey='data_url'
		>
			{({ imageList, onImageUpload, onImageRemove, dragProps }) => {
				return (
					// write your building UI
					<>
						{imageList.length > 0 &&
							imageList.map((image, index) => {
								return (
									<Grid item xs={6} key={index} className='image-item'>
										<Box className='uploaded-image-container'>
											<img
												src={image.data_url}
												alt='product'
												width='120'
												className='uploaded-image'
											/>
										</Box>
										<Box className='image-item-btn'>
											<Button
												variant='contained'
												onClick={() => onImageRemove(index)}
											>
												Remove
											</Button>
										</Box>
									</Grid>
								)
							})}
						<Grid item xs={6}>
							<UploadImage onClick={onImageUpload} {...dragProps}>
								<Add />
							</UploadImage>
						</Grid>
					</>
				)
			}}
		</ReactImageUploading>
	)
}

export default ImageUploading
