import { Box } from '@mui/material'
import { styled } from '@mui/system'
export const ContactPageContainer = styled(Box)({
	'& .shop-information': {
		maxWidth: '60%',
		margin: '0 auto',
		'& h2,p': { textAlign: 'center' },
		'& h2': {
			marginBottom: '30px'
		}
	},
	'& .contact-input-container': { marginBottom: '50px' },
	'& .contact-input-label': { marginBottom: '10px', fontWeight: 700 }
})
