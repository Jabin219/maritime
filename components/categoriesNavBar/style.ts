import { Tab } from '@mui/material'
import { styled } from '@mui/system'

const CustomTab = styled(Tab)({
	fontFamily: 'Source Sans 3',
	fontSize: '20px',
	fontWeight: 500,
	lineHeight: '28px',
	textTransform: 'uppercase',
	'& .MuiTouchRipple-root': {
		display: 'none'
	},
	marginRight: '1vw',
	textTransform: 'none',
	padding: '15px 1.2vw'
})

export { CustomTab }
