import {
	Box,
	Grid,
	TextField,
	Typography,
	Button,
	MenuItem,
	FormControlLabel,
	Checkbox,
	CircularProgress
} from '@mui/material'
import { TextContext } from 'contexts/TextContext'
import React, { useContext, useReducer, useState } from 'react'
import { AddProductContainer } from './style'
import { Categories, ResponseStatus } from 'constants/index'
import { addNewProduct } from 'axios/product'
import { useNavigate } from 'react-router-dom'
import ImageUploading from 'components/ImageUploading'
import { uploadImages } from './uploadImages'
const initialProductInformation = {
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
	const [processing, setProcessing] = useState(false)
	const [images, setImages] = useState([])
	const handleSubmit = async (productInformation: any) => {
		setProcessing(true)
		const uploadedFiles = await uploadImages(images)
		const imageUrls = uploadedFiles.map(
			(uploadedFile: any) => uploadedFile.fileUrl
		)
		const result = await addNewProduct(productInformation, imageUrls)
		if (result.data.status === ResponseStatus.SUCCESS) {
			navigate('/add-product-complete')
		} else {
			setProcessing(false)
		}
	}
	return (
		<AddProductContainer>
			<Box className='upload-image-container'>
				<Typography>Upload Images</Typography>
				<Grid container>
					<ImageUploading
						setImages={setImages}
						images={images}
						processing={processing}
					/>
				</Grid>
			</Box>
			<Box className='product-name'>
				<Typography>Product Name</Typography>
				<TextField
					fullWidth
					size='small'
					inputProps={{ maxLength: 80 }}
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
				disabled={!checked || processing}
				className='submit-btn'
				onClick={() => {
					handleSubmit(productInformation)
				}}
			>
				Add New Product
				{processing && (
					<CircularProgress
						style={{ position: 'absolute', color: '#fff' }}
						size={24}
					/>
				)}
			</Button>
		</AddProductContainer>
	)
}
export default AddProduct
