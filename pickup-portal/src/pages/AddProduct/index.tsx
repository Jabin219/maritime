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
	const [processing, setProcessing] = useState(false)
	const handleSubmit = async (productInformation: any) => {
		setProcessing(true)
		const result = await addNewProduct(productInformation)
		if (result.data.status === ResponseStatus.SUCCESS) {
			setProcessing(false)
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
						dispatch={dispatch}
						productInformation={productInformation}
					/>
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
