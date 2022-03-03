import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider, Box, CssBaseline } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductContextProvider from '../context/ProductContextProvider'

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
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontStyle: 'normal'
		},
		h1: {
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontStyle: 'normal'
		},
		h2: {
			fontFamily: 'Source Sans Pro',
			color: '#333333',
			fontStyle: 'normal'
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
			lineHeight: '28px'
		}
	}
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
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
