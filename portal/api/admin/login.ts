import axios from 'axios'
import { LoginRequest } from 'models'

const sendLoginRequest = (data: LoginRequest) =>
	axios.post('/api/admin/login', data)

export { sendLoginRequest }
