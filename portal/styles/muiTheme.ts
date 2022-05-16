import { createTheme } from '@mui/material'

export const theme = createTheme({
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
			fontWeight: 700,
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
			fontStyle: 'normal',
			fontSize: 28,
			fontWeight: 600,
			lineHeight: '40px'
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
