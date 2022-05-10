import {
	Box,
	Grid,
	TextField,
	Typography,
	Button,
	MenuItem,
	FormControlLabel,
	Checkbox
} from '@mui/material'
import { TextContext } from 'contexts/TextContext'
import React, { useContext, useReducer, useState } from 'react'
import { AddProductContainer, UploadImage } from './style'
import { Add } from '@mui/icons-material'
import ReactImageUploading, { ImageListType } from 'react-images-uploading'
import { Categories, ResponseStatus } from 'constants/index'
import { addNewProduct } from 'axios/product'
import { useNavigate } from 'react-router-dom'
const initialProductInformation = {
	images: [],
	name: '',
	price: 0,
	originalPrice: 0,
	category: '',
	stock: 0
}
const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'CHANGE_PRODUCT_NAME':
			return { ...state, name: action.value }
		case 'CHANGE_PRODUCT_IMAGES':
			return { ...state, images: action.value }
		case 'CHANGE_PRODUCT_ORIGINAL_PRICE':
			return { ...state, originalPrice: Number(action.value) }
		case 'CHANGE_PRODUCT_PRICE':
			return { ...state, price: Number(action.value) }
		case 'CHANGE_PRODUCT_CATEGORY':
			return { ...state, category: action.value }
		case 'CHANGE_PRODUCT_STOCK':
			return { ...state, stock: Number(action.value) }
		default:
			throw new Error()
	}
}
const AddProduct = () => {
	const navigate = useNavigate()
	const { setHeaderTitle } = useContext(TextContext)
	setHeaderTitle('Add New Product')
	const [productInformation, dispatch] = useReducer(
		reducer,
		initialProductInformation
	)
	const [checked, setChecked] = useState(false)
	const handleUploadImage = (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined
	) => {
		// data for submit
		dispatch({ type: 'CHANGE_PRODUCT_IMAGES', value: imageList as never[] })
	}
	const handleSubmit = async (productInformation: any) => {
		const result = await addNewProduct(productInformation)
		if (result.data.status === ResponseStatus.SUCCESS) {
			navigate('/add-product-complete')
		}
	}
	return (
		<AddProductContainer>
			<Box className='upload-image-container'>
				<Typography>Upload Images</Typography>
				<Grid container>
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
				</Grid>
			</Box>
			<Box className='product-name'>
				<Typography>Product Name</Typography>
				<TextField
					fullWidth
					size='small'
					onChange={event => {
						dispatch({
							type: 'CHANGE_PRODUCT_NAME',
							value: event.target.value
						})
					}}
				/>
			</Box>
			<Box className='product-stock'>
				<Typography>Stock</Typography>
				<TextField
					size='small'
					onChange={event => {
						dispatch({
							type: 'CHANGE_PRODUCT_STOCK',
							value: event.target.value
						})
					}}
				/>
			</Box>
			<Box className='product-original-price'>
				<Typography>Original Price</Typography>
				<TextField
					size='small'
					onChange={event => {
						dispatch({
							type: 'CHANGE_PRODUCT_ORIGINAL_PRICE',
							value: event.target.value
						})
					}}
				/>
			</Box>
			<Box className='product-price'>
				<Typography>Actual Price (Discounted Price)</Typography>
				<TextField
					size='small'
					onChange={event => {
						dispatch({
							type: 'CHANGE_PRODUCT_PRICE',
							value: event.target.value
						})
					}}
				/>
			</Box>
			<Box className='product-category'>
				<Typography>Category</Typography>
				<TextField
					fullWidth
					select
					size='small'
					value={productInformation.category}
					onChange={event => {
						dispatch({
							type: 'CHANGE_PRODUCT_CATEGORY',
							value: event.target.value
						})
					}}
				>
					{Categories.map(category => (
						<MenuItem key={category.name} value={category.name}>
							{category.label}
						</MenuItem>
					))}
				</TextField>
			</Box>
			<FormControlLabel
				className='final-check'
				label='I checked all infomation above is correct'
				control={
					<Checkbox
						checked={checked}
						onChange={() => {
							setChecked(!checked)
						}}
					/>
				}
			/>
			<Button
				variant='contained'
				fullWidth
				disabled={!checked}
				className='submit-btn'
				onClick={() => {
					handleSubmit(productInformation)
				}}
			>
				Add New Product
			</Button>
		</AddProductContainer>
	)
}
export default AddProduct
