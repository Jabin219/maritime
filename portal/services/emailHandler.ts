import MailService from '@sendgrid/mail'
import { ContactInformation, Order, Product } from 'models'
import { format } from 'date-fns'
import { OrderStatus } from 'constant'

MailService.setApiKey(process.env.SENDGRID_API_KEY as string)

const sendOrderConfirmation = (order: Order) => {
	const contactInformation: ContactInformation =
		order.contactInformation as ContactInformation
	const date = format(order.createdAt as any, 'yyyy/MM/dd')
	const products = JSON.parse(order.products as string)
	const msg = {
		to: contactInformation.email,
		from: 'dev@zmley.com',
		templateId:
			order.status === OrderStatus.reserved
				? (process.env.SENDGRID_RESERVED_ORDER_TEMPLATE_ID as string)
				: (process.env.SENDGRID_PAID_ORDER_TEMPLATE_ID as string),
		dynamicTemplateData: {
			order,
			contactInformation: order.contactInformation,
			products,
			date
		}
	}
	;(async () => {
		try {
			await MailService.send(msg)
		} catch (error) {
			console.error(error)
			if ((error as any).response) {
				console.error((error as any).response.body)
			}
		}
	})()
}

export { sendOrderConfirmation }
