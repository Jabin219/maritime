import { Tab, Grid } from '@mui/material'
import { styled } from '@mui/system'

const CustomGrid = styled(Grid)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'& .MuiBadge-badge': {
		color: '#ffffff'
	}
})

export { CustomGrid }
