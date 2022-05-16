import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, Box } from '@mui/material'
import Header from '../components/header'
import Footer from '../components/footer'
import ProductContextProvider from '../context/ProductContextProvider'
import Head from 'next/head'
import SnackContextProvider from '../context/SnackContextProvider'
import { useRouter } from 'next/router'
import { theme } from 'styles/muiTheme'

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Maritime Household</title>
				<meta
					name='viewport'
					content='content="width=device-width, initial-scale=0, maximum-scale=0, user-scalable=0, shrink-to-fit=0'
				></meta>
			</Head>
			<ProductContextProvider>
				<SnackContextProvider>
					{!router.pathname.startsWith('/admin') && <Header />}
					{typeof window !== 'undefined' ? (
						<Box
							sx={{
								maxWidth: '1920px',
								margin: '0 auto',
								paddingBottom: '150px'
							}}
						>
							<Component {...pageProps} />
						</Box>
					) : (
						<Box sx={{ minHeight: '100vh', paddingBottom: '150px' }}></Box>
					)}
					{!router.pathname.startsWith('/admin') && <Footer />}
				</SnackContextProvider>
			</ProductContextProvider>
		</ThemeProvider>
	)
}

export default MyApp
