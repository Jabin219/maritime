import { styled } from '@mui/system'
import { Box } from '@mui/material'
import { FlexBox } from 'components/FlexBox'
export const AddProductContainer = styled(Box)({
	padding: '30px',
	'& p': {
		fontWeight: 400,
		lineHeight: '30px',
		marginBottom: '6px'
	},
	'& .MuiOutlinedInput-root': {
		borderRadius: '0'
	},
	'& .upload-image-container': {
		marginBottom: '30px',
		width: '90%',
		'& .uploaded-image-container': {
			position: 'relative',
			'& .uploaded-image': {
				border: '1px solid #ADADAD'
			}
		},
		'& button': {
			textTransform: 'none',
			backgroundColor: '#D8D8D8',
			padding: '5px 10px',
			fontSize: '12px',
			color: '#000',
			margin: '5px 0 15px'
		}
	},
	'& .product-name, .product-stock, .product-price, .product-original-price': {
		marginBottom: '15px'
	},
	'& .final-check': {
		marginTop: '50px',
		marginBottom: '20px'
	},
	'& .submit-btn': {
		textTransform: 'none',
		fontSize: '20px',
		fontWeight: '700'
	}
})
