import { Tab, Grid } from '@mui/material'
import { styled } from '@mui/system'

const CustomTab = styled(Tab)({
	fontFamily: 'Source Sans Pro',
	fontSize: '20px',
	fontWeight: 700,
	lineHeight: '28px',
	textTransform: 'uppercase',
	'& .MuiTouchRipple-root': {
		display: 'none'
	},
	marginRight: '1vw'
})

const CustomGrid = styled(Grid)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'& .MuiBadge-badge': {
		color: '#ffffff'
	}
})

export { CustomTab, CustomGrid }
