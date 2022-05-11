import axios from 'axios'
import { sendLoginRequest } from './login'

if (typeof window !== 'undefined') {
	axios.defaults.headers = {
		authorization: localStorage.getItem('token')
	} as any
}

axios.interceptors.response.use(
	response => response,
	error => {
		const statusCode = error.response ? error.response.status : null
		if (statusCode === 403) {
			localStorage.clear()
			window.location.href = '/'
		}
		throw error
	}
)

export { sendLoginRequest }
