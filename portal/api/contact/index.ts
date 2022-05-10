import axios from 'axios'
import { ContactContent } from 'models'

const sendContactEmail = (contactContent: ContactContent) =>
	axios.post('/api/contact/email', { contactContent })

export { sendContactEmail }
