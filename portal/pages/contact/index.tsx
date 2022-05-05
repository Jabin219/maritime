import { Box, Typography, Grid, TextField } from '@mui/material'
import { sendContactEmail } from 'api/contact'
import { SubPageButton } from 'components/customStyle'
import PageBanner from 'components/pageBanner'
import { ResponseStatus, SnackType } from 'constant'
import { SnackContext } from 'context/SnackContextProvider'
import { ContactContent } from 'models'
import { useContext, useReducer, useState } from 'react'
import { ContactPageContainer } from 'styles/pages/contact'
import validator from 'validator'

const initialContactContent = { name: '', email: '', message: '' }
const contactReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'CHANGE_NAME':
			return { ...state, name: action.value }
			break
		case 'CHANGE_EMAIL':
			return { ...state, email: action.value }
			break
		case 'CHANGE_MESSAGE':
			return { ...state, message: action.value }
			break
		default:
			throw new Error()
	}
}

const Contact = () => {
	const [contactContent, dispatch] = useReducer(
		contactReducer,
		initialContactContent
	)
	const [error, setError] = useState(false)
	const { showSnackbar } = useContext(SnackContext)
	const handleSendContactEmail = async (contactContent: ContactContent) => {
		if (
			!contactContent.name ||
			!contactContent.email ||
			!contactContent.message
		) {
			setError(true)
			return false
		}
		if (!validator.isEmail(contactContent.email as string)) {
			setError(true)
			return false
		}
		const result = (await sendContactEmail(contactContent)).data
		if (result.status === ResponseStatus.SUCCESS) {
			showSnackbar(SnackType.CONTACT_EMAIL_SENT)
		} else {
			showSnackbar(SnackType.UNKNOWN_ERROR)
		}
	}
	return (
		<ContactPageContainer>
			<PageBanner
				pageTitle='Contact us'
				pageDescription='All of our products are authentic, guaranteed'
				bannerUrl='/images/contact/contact-banner.jpg'
			/>
			<Box className='contact-main-body' sx={{ marginTop: '100px' }}>
				<Grid container className='shop-information'>
					<Grid item xs>
						<Typography variant='h2'>Location</Typography>
						<Typography>50 Tacoma Dr, Dartmouth, NS, B2W 3E6</Typography>
					</Grid>
					<Grid item xs>
						<Typography variant='h2'>E-mail</Typography>
						<Typography>maritimehousehold@gmail.com</Typography>
					</Grid>
				</Grid>
				<Box
					className='contact-form-container'
					sx={{ width: '50%', margin: '0 auto', marginTop: '80px' }}
				>
					<Box className='contact-input-container'>
						<Typography className='contact-input-label'>Name</Typography>
						<TextField
							fullWidth
							required
							size='small'
							error={!contactContent.name && error}
							onChange={event => {
								dispatch({
									type: 'CHANGE_NAME',
									value: event.target.value
								})
							}}
						/>
					</Box>
					<Box className='contact-input-container'>
						<Typography className='contact-input-label'>Email</Typography>
						<TextField
							fullWidth
							required
							size='small'
							error={
								(!contactContent.email ||
									!validator.isEmail(contactContent.email as string)) &&
								error
							}
							onChange={event => {
								dispatch({
									type: 'CHANGE_EMAIL',
									value: event.target.value
								})
							}}
						/>
					</Box>
					<Box className='contact-input-container'>
						<Typography className='contact-input-label'>Message</Typography>
						<TextField
							fullWidth
							required
							multiline
							rows={8}
							error={!contactContent.message && error}
							onChange={event => {
								dispatch({
									type: 'CHANGE_MESSAGE',
									value: event.target.value
								})
							}}
						/>
					</Box>
				</Box>
				<SubPageButton
					disableElevation
					onClick={() => {
						handleSendContactEmail(contactContent)
					}}
				>
					SEND
				</SubPageButton>
			</Box>
		</ContactPageContainer>
	)
}

export default Contact
