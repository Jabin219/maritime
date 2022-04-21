import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL

const sendLoginRequest = (username: string, password: string) =>
	axios.post('/api/admin/login', { username, password })

export { sendLoginRequest }
