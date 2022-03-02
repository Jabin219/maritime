import { Tab, Grid, Button, CssBaseline } from '@mui/material'
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
	alignItems: 'center'
})

const HeaderButton = styled(Button)({
	fontFamily: 'Source Sans Pro',
	borderRadius: '12px',
	padding: '10px 35px',
	fontSize: '20px',
	lineHeight: '28px',
	fontWeight: 600,
	textTransform: 'none',
	whiteSpace: 'nowrap'
})

export { CustomTab, CustomGrid, HeaderButton }
