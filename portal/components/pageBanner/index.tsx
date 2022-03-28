import { Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { getBannerHeight } from 'utils'
import { FlexBox } from '../customStyle'

interface Props {
	pageTitle: string
	bannerUrl: string
	pageDescription: string
}

const PageBanner = ({ pageTitle, pageDescription, bannerUrl }: Props) => {
	const [bannerHeight, setBannerHeight] = useState(400)
	useEffect(() => {
		setBannerHeight(getBannerHeight(3.6))
	}, [])
	return (
		<FlexBox
			className='page-banner-container'
			sx={{
				width: '100%',
				height: bannerHeight,
				background: `url(${bannerUrl}) no-repeat`,
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}
		>
			{pageTitle && (
				<Typography variant='h1' sx={{ color: '#ffffff' }}>
					{pageTitle}
				</Typography>
			)}
			{pageDescription && (
				<Typography variant='h6' sx={{ color: '#ffffff' }}>
					{pageDescription}
				</Typography>
			)}
		</FlexBox>
	)
}

export default PageBanner
