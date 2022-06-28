import MailService from '@sendgrid/mail'
import { ContactContent, ContactInformation, Order } from 'models'
import { format } from 'date-fns'
import { OrderStatus, PaymentMethod, ResponseStatus } from 'constant'

MailService.setApiKey(process.env.SENDGRID_API_KEY as string)

const sendOrderConfirmation = async (order: Order) => {
	const contactInformation: ContactInformation =
		order.contactInformation as ContactInformation
	const date = format(order.createdAt as any, 'yyyy/MM/dd')
	const products = JSON.parse(order.products as string)
	const paymentMethod =
		order.paymentMethod === PaymentMethod.creditCard
			? 'Credit Card'
			: 'Pay on Pickup'
	const msg = {
		to: [
			contactInformation.email,
			process.env.MARITIME_RECEIVER_EMAIL as string
		],
		bcc: ['jiabin@zmley.com', 'summer@zmley.com'],
		from: {
			name: 'Maritime Household',
			email: process.env.SENDGRID_SENDER_EMAIL as string
		},
		subject: 'Order Confirmation',
		templateId:
			order.status === OrderStatus.reserved
				? (process.env.SENDGRID_RESERVED_ORDER_TEMPLATE_ID as string)
				: (process.env.SENDGRID_PAID_ORDER_TEMPLATE_ID as string),
		dynamicTemplateData: {
			order,
			contactInformation: order.contactInformation,
			products,
			date,
			paymentMethod
		}
	}
	try {
		await MailService.send(msg)
		return { status: ResponseStatus.SUCCESS }
	} catch (error: any) {
		// Log friendly error
		console.error(error)
		if (error.response) {
			// Extract error msg
			const { message, code, response } = error
			// Extract response msg
			const { headers, body } = response
			console.error(body)
		}
		return { status: ResponseStatus.ERROR, error }
	}
}

const sendContactEmail = async (contactContent: ContactContent) => {
	const msg = {
		// 需改成客户邮箱
		to: process.env.MARITIME_RECEIVER_EMAIL,
		bcc: ['jiabin@zmley.com', 'summer@zmley.com'],
		// 需改成客户邮箱
		from: {
			name: 'Maritime Household',
			email: process.env.SENDGRID_SENDER_EMAIL as string
		},
		templateId: process.env.SENDGRID_CONTACT_TEMPLATE_ID as string,
		dynamicTemplateData: {
			contactContent
		}
	}
	try {
		await MailService.send(msg)
		return { status: ResponseStatus.SUCCESS }
	} catch (error: any) {
		// Log friendly error
		console.error(error)
		if (error.response) {
			// Extract error msg
			const { message, code, response } = error
			// Extract response msg
			const { headers, body } = response
			console.error(body)
		}
		return { status: ResponseStatus.ERROR, error }
	}
}

export { sendOrderConfirmation, sendContactEmail }
