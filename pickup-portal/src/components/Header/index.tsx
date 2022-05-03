import { Typography } from '@mui/material'
import { TextContext } from 'contexts/TextContext'
import React, { useContext } from 'react'
import { ArrowBackIosNew } from '@mui/icons-material'
import { HeaderContainer } from './style'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { headerTitle } = useContext(TextContext)
	return (
		<HeaderContainer>
			{location.pathname !== '/' && (
				<ArrowBackIosNew
					onClick={() => {
						navigate(-1)
					}}
				/>
			)}
			<Typography className='header-title' variant='h5'>
				{headerTitle}
			</Typography>
		</HeaderContainer>
	)
}

export default Header
