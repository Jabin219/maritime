import MailService from '@sendgrid/mail'
import { ContactInformation, Order, Product } from 'models'
import { format } from 'date-fns'

MailService.setApiKey(process.env.SENDGRID_API_KEY as string)

export const sendReservedOrderConfirmation = (
	order: Order,
	products: Product[]
) => {
	const contactInformation: ContactInformation = JSON.parse(
		order.contactInformation as string
	)
	const date = format(order.createdAt as any, 'yyyy/MM/dd')
	const msg = {
		to: contactInformation.email,
		from: 'dev@zmley.com',
		templateId: process.env.SENDGRID_TEMPLATE_ID as string,
		dynamicTemplateData: {
			order,
			contactInformation: JSON.parse(order.contactInformation as string),
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
