import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import React from 'react'

const Alert: any = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref as any} variant='filled' {...props} />
})

interface Props {
	open: boolean
	snackClose: () => void
	snackType: string
	snackSeverity: string
}

const CustomSnackBar = ({
	open,
	snackClose,
	snackType,
	snackSeverity
}: Props) => {
	const getSnackbarContent = (snackType: string) => {
		switch (snackType) {
			case 'add-to-cart':
				return 'One item has been added to your cart!'
				break
			default:
				break
		}
		return ''
	}
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={open}
			autoHideDuration={3000}
			onClose={snackClose}
		>
			<Alert onClose={snackClose} severity={snackSeverity}>
				{getSnackbarContent(snackType)}
			</Alert>
		</Snackbar>
	)
}

export default CustomSnackBar
