import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import CategoryList from '../../components/CategoryList'
import { SampleCategories } from '../../constant/products'

function ProductList() {
	return (
		<Box className='product-list-page'>
			<Grid container>
				<Grid item xs={3}>
					<CategoryList Categories={SampleCategories} />
				</Grid>
				<Grid item></Grid>
			</Grid>
		</Box>
	)
}

export default ProductList
