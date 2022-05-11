import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from './muiTheme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<MuiThemeProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</MuiThemeProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()