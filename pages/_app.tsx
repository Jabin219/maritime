import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider, Box, CssBaseline } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductContextProvider from '../context/ProductContextProvider'
import Head from 'next/head'

const theme = createTheme({
	palette: {
		primary: {
			main: '#FF8800'
		},
		secondary: {
			main: '#ffffff'
		}
	},
	typography: {
		body1: {
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontSize: 20,
			lineHeight: '28px',
			fontStyle: 'normal'
		},
		body2: {
			fontSize: 30,
			lineHeight: '43px',
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontStyle: 'normal'
		},
		h1: {
			fontSize: 60,
			fontWeight: 900,
			lineHeight: '85px',
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontStyle: 'normal',
			textAlign: 'center'
		},
		h2: {
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontStyle: 'normal',
			fontSize: 40,
			fontWeight: 900,
			lineHeight: '57px',
			textAlign: 'center'
		},
		h3: {
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontStyle: 'normal'
		},
		h4: {
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontStyle: 'normal'
		},
		h5: {
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontStyle: 'normal'
		},
		h6: {
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontStyle: 'normal',
			fontSize: 20,
			fontWeight: 600,
			lineHeight: '28px'
		}
	}
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Maritime Household</title>
				<meta name='viewport' content='viewport-fit=cover' />
			</Head>
			<ProductContextProvider>
				<Header />
				<Box sx={{ maxWidth: '1920px', margin: '0 auto', minHeight: '90vh' }}>
					<Component {...pageProps} />
				</Box>
				<Footer />
			</ProductContextProvider>
		</ThemeProvider>
	)
}

export default MyApp
