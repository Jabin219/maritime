import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider, Box, CssBaseline } from '@mui/material'
import Header from '../components/Header'

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
			color: '#333333'
		},
		body2: {
			fontFamily: 'Source Sans Pro',
			color: '#333333'
		},
		h1: { fontFamily: 'Source Sans Pro', color: '#333333' },
		h2: { fontFamily: 'Source Sans Pro', color: '#333333' },
		h3: { fontFamily: 'Source Sans Pro', color: '#333333' },
		h4: { fontFamily: 'Source Sans Pro', color: '#333333' },
		h5: { fontFamily: 'Source Sans Pro', color: '#333333' },
		h6: { fontFamily: 'Source Sans Pro', color: '#333333' }
	}
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Box sx={{ maxWidth: '1920px', margin: '0 auto' }}>
				<Component {...pageProps} />
			</Box>
		</ThemeProvider>
	)
}

export default MyApp
