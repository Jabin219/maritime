import { styled } from '@mui/system'
import { FlexBox } from 'components/FlexBox'

export const UploadImage = styled(FlexBox)({
	width: '120px',
	height: '120px',
	backgroundColor: '#eeeeee',
	cursor: 'pointer',
	'& .MuiSvgIcon-root': { color: '#adadad', fontSize: '32px' }
})
