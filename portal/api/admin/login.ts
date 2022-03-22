import axios from 'axios'
import { LoginRequestData } from 'models'

const sendLoginRequest = (loginRequestData: LoginRequestData) =>
	axios.post('/api/admin/login', loginRequestData)

export { sendLoginRequest }
