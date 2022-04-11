import axios from 'axios'

const sendLoginRequest = (username: string, password: string) =>
	axios.post('/api/admin/login', { username, password })

export { sendLoginRequest }
