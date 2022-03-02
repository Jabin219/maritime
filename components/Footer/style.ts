import { Typography } from '@mui/material'
import { styled } from '@mui/system'

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

export { FooterTypography, FooterListTitle }
