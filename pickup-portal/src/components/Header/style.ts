import { styled } from '@mui/system'
import { FlexBox } from 'components/FlexBox'
export const HeaderContainer = styled(FlexBox)({
	padding: '0 20px',
	height: 60,
	borderBottom: '1px solid #C4C4C4',
	position: 'relative',
	'& .MuiSvgIcon-root': {
		fontSize: '17px',
		position: 'absolute',
		left: 18,
		cursor: 'pointer'
	}
})
