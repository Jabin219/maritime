import { Button, Snackbar, Stack } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { SnackSeverity, SnackType } from 'constant'
import { ProductContext } from 'context/ProductContextProvider'
import { forwardRef, useContext } from 'react'

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
				return 'One or more items in your cart is out of stock.'
			case SnackType.PAYMENT_FAILED:
				return 'Payment failed because of some unknown reasons.'
			default:
				break
		}
		return ''
	}
	const getSnackSeverity = (snackType: string) => {
		switch (snackType) {
			case SnackType.ADD_TO_CART:
				return SnackSeverity.SUCCESS
			case SnackType.PAYMENT_FAILED:
				return SnackSeverity.ERROR
			default:
				break
		}
		return ''
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
						sx={{ fontSize: 20, marginLeft: '20px' }}
					>
						Back to cart
					</Button>
				)
				break
			default:
				break
		}
		return ''
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
					sx={{
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
				>
					<Alert onClose={snackClose} severity={getSnackSeverity(snackType)}>
						{getSnackbarContent(snackType)}
					</Alert>
				</Snackbar>
			)}
		</Stack>
	)
}
export default CustomSnackBar
