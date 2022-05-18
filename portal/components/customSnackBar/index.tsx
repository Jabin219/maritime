import { Button, Snackbar, Stack } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { SnackSeverity, SnackType } from 'constant'
import { ProductContext } from 'context/ProductContextProvider'
import { forwardRef, useContext } from 'react'
import Fade from '@mui/material/Fade'

const Alert: any = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref as any} variant='filled' {...props} />
})

interface Props {
	open: boolean
	snackClose: () => void
	snackType: string
}

const CustomSnackBar = ({ open, snackClose, snackType }: Props) => {
	const { setOrderStep } = useContext(ProductContext)
	const getSnackbarContent = (snackType: string) => {
		switch (snackType) {
			case SnackType.ADD_TO_CART:
				return 'One item has been added to your cart!'
			case SnackType.OUT_OF_STOCK:
				return 'One or more items in your cart are out of stock.'
			case SnackType.PAYMENT_FAILED:
				return 'Payment failed because of some unknown reasons.'
			case SnackType.CONTACT_EMAIL_SENT:
				return 'Your message has been sent.'
			case SnackType.UNKNOWN_ERROR:
				return 'Unknown error happened.'
			default:
				return ''
		}
	}
	const getSnackSeverity = (snackType: string) => {
		switch (snackType) {
			case SnackType.ADD_TO_CART:
				return SnackSeverity.SUCCESS
			case SnackType.CONTACT_EMAIL_SENT:
				return SnackSeverity.SUCCESS
			case SnackType.PAYMENT_FAILED:
				return SnackSeverity.ERROR
			case SnackType.UNKNOWN_ERROR:
				return SnackSeverity.ERROR
			default:
				return SnackSeverity.SUCCESS
		}
	}
	const getSnackbarAction = (snackType: string) => {
		switch (snackType) {
			case SnackType.OUT_OF_STOCK:
				return (
					<Button
						color='primary'
						onClick={() => {
							setOrderStep(0)
						}}
						sx={{ fontSize: 18, marginLeft: '20px' }}
					>
						Back to cart
					</Button>
				)
			default:
				break
		}
	}
	return (
		<Stack spacing={2}>
			{snackType === SnackType.OUT_OF_STOCK ? (
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={open}
					onClose={snackClose}
					action={getSnackbarAction(snackType)}
					message={getSnackbarContent(snackType)}
					TransitionComponent={Fade}
					sx={{
						fontSize: 18,
						marginTop: '100px',
						'& .MuiSnackbarContent-root': { padding: '15px 30px' }
					}}
				/>
			) : (
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={open}
					autoHideDuration={3000}
					onClose={snackClose}
					TransitionComponent={Fade}
					sx={{ '& .MuiAlert-message': { fontSize: 18, padding: 0 } }}
				>
					<Alert
						onClose={snackClose}
						severity={getSnackSeverity(snackType)}
						sx={{ width: '100%' }}
					>
						{getSnackbarContent(snackType)}
					</Alert>
				</Snackbar>
			)}
		</Stack>
	)
}
export default CustomSnackBar
