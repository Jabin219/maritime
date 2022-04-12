import { Button, Snackbar, Stack } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
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
			case 'add-to-cart':
				return 'One item has been added to your cart!'
				break
			case 'out-of-stock':
				return 'One or more items in your cart is out of stock.'
				break
			default:
				break
		}
		return ''
	}
	const getSnackSeverity = (snackType: string) => {
		switch (snackType) {
			case 'add-to-cart':
				return 'success'
				break
			default:
				break
		}
		return ''
	}
	const getSnackbarAction = (snackType: string) => {
		switch (snackType) {
			case 'out-of-stock':
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
			{snackType === 'out-of-stock' ? (
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
