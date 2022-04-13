import { Grid, Typography, Box } from '@mui/material'
import { styled } from '@mui/system'

const ProductListPageContainer = styled(Box)({
	marginBottom: '200px',
	position: 'relative',
	'& .sort-by-select': {
		minWidth: 200,
		position: 'absolute',
		right: '5%',
		top: '50px'
	},
	'& .pagination-container': {
		'& ul': {
			justifyContent: 'center',
			alignItems: 'center',
			'& button': {
				fontSize: '20px'
			},
			'& .css-133iz6r-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
				color: '#ffffff'
			}
		}
	}
})
const ProductListContainer = styled(Box)({
	marginTop: '20px',
	marginBottom: '50px'
})
const ProductListGrid = styled(Grid)({
	marginBottom: '20px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	'& .product-name, .product-name': {
		fontSize: 20,
		fontWeight: 600,
		textAlign: 'center'
	},
	'& .product-name': {
		cursor: 'pointer'
	},
	'& .product-price': {
		color: '#FF8800',
		fontWeight: 600
	}
})
const ProductListTitle = styled(Typography)({
	marginTop: 50,
	marginBottom: 50,
	fontWeight: 900,
	fontSize: 40,
	textAlign: 'center'
})

export {
	ProductListGrid,
	ProductListTitle,
	ProductListContainer,
	ProductListPageContainer
}
