import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

const FooterContainer = styled(Box)({
	height: 520,
	backgroundColor: '#222222',
	'& .week-day': {
		width: '30%'
	}
})
const CopyrightContainer = styled(Box)({
	height: 80,
	backgroundColor: '#222222',
	'& p': { textAlign: 'center', lineHeight: '80px' }
})

const FooterTypography = styled(Typography)({
	fontSize: '20px',
	fontWeight: 500,
	lineHeight: '28px',
	color: '#fff'
})
const FooterListTitle = styled(Typography)({
	fontSize: '40px',
	fontWeight: 700,
	color: '#fff',
	marginBottom: '15px'
})

export {
	FooterTypography,
	FooterListTitle,
	FooterContainer,
	CopyrightContainer
}
