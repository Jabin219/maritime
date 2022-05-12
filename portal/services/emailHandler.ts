import MailService from '@sendgrid/mail'
import { ContactContent, ContactInformation, Order } from 'models'
import { format } from 'date-fns'
import { OrderStatus, PaymentMethod } from 'constant'

MailService.setApiKey(process.env.SENDGRID_API_KEY as string)

const sendOrderConfirmation = async (order: Order) => {
	const contactInformation: ContactInformation =
		order.contactInformation as ContactInformation
	const date = format(order.createdAt as any, 'yyyy/MM/dd')
	const products = JSON.parse(order.products as string)
	const paymentMethod =
		order.paymentMethod === PaymentMethod.creditCard
			? 'Credit card'
			: 'Pay on pickup'
	const msg = {
		to: contactInformation.email,
		// 需改成客户邮箱
		from: 'dev@zmley.com',
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
	} catch (error) {
		console.error(error)
		if ((error as any).response) {
			console.error((error as any).response.body)
		}
	}
}

const sendContactEmail = async (contactContent: ContactContent) => {
	const msg = {
		// 需改成客户邮箱
		to: 'jabin219@gmail.com',
		// 需改成客户邮箱
		from: 'dev@zmley.com',
		templateId: process.env.SENDGRID_CONTACT_TEMPLATE_ID as string,
		dynamicTemplateData: {
			contactContent
		}
	}
	try {
		await MailService.send(msg)
	} catch (error: any) {
		console.error(error)
		if (error.response) {
			console.error(error.response.body)
		}
	}
}

export { sendOrderConfirmation, sendContactEmail }
