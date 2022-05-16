import { ContactInformation, Order, Product } from 'models'
import validator from 'validator'
import { createOrder } from 'api/order'
import { PaymentMethod, ResponseStatus, SnackType } from 'constant'

export const saveContactInformation = (
	contactInformation: ContactInformation
) => {
	typeof window !== 'undefined' &&
		localStorage.setItem(
			'contactInformation',
			JSON.stringify(contactInformation)
		)
}
export const getContactInformation = () => {
	const contactInformation =
		typeof window !== 'undefined' && localStorage.getItem('contactInformation')
	return contactInformation ? JSON.parse(contactInformation) : undefined
}

export const contactFormValidator = (
	contactInformation: ContactInformation,
	setContactNameError: (error: boolean) => void,
	setContactEmailError: (error: boolean) => void,
	setContactPhoneError: (error: boolean) => void
) => {
	if (!contactInformation.name) {
		setContactNameError(true)
		return false
	}
	if (
		!contactInformation.email ||
		!validator.isEmail(contactInformation.email as string)
	) {
		setContactEmailError(true)
		return false
	}
	if (!contactInformation.phone) {
		setContactPhoneError(true)
		return false
	}
	return true
}
export const handleSubmitOrder = async (
	contactInformation: ContactInformation,
	setContactNameError: (error: boolean) => void,
	setContactEmailError: (error: boolean) => void,
	setContactPhoneError: (error: boolean) => void,
	setProcessing: (processing: boolean) => void,
	order: Order,
	shippingMethod: string,
	paymentMethod: string,
	showSnackbar: (snackType: string) => void,
	cart: Product[],
	setCart: (cart: Product[]) => void,
	stripe: any,
	elements: any,
	CardElement: any,
	setCardInputError: (error: string) => void,
	setOrder: (order: Order) => void,
	clearCart: any,
	next: any
) => {
	const validatorResult = contactFormValidator(
		contactInformation,
		setContactNameError,
		setContactEmailError,
		setContactPhoneError
	)
	if (validatorResult) {
		saveContactInformation(contactInformation)
		setProcessing(true)
		const orderedProducts = (order.products as Product[]).map(
			(product: Product) => {
				return {
					productId: product._id,
					quantity: Number(product.quantity)
				}
			}
		)
		const createdOrderResult: any = await createOrder(
			contactInformation,
			shippingMethod,
			paymentMethod,
			orderedProducts
		)
		if (createdOrderResult.data.status === ResponseStatus.OUT_OF_STOCK) {
			showSnackbar(SnackType.OUT_OF_STOCK)
			let newCart: Product[] = []
			createdOrderResult.data.products.forEach((productId: string) => {
				cart.forEach((cartItem: Product) => {
					if (cartItem._id === productId) {
						cartItem.outOfStock = true
					}
					newCart.push(cartItem)
				})
			})
			setCart(newCart)
			setProcessing(false)
		} else if (createdOrderResult.data.status === ResponseStatus.SUCCESS) {
			if (paymentMethod === PaymentMethod.creditCard) {
				if (!stripe || !elements) {
					setProcessing(false)
					return
				}
				const cardInformation = elements.getElement(CardElement) as any
				const payload = await stripe.confirmCardPayment(
					createdOrderResult.data.intentSecret,
					{
						payment_method: {
							card: cardInformation,
							billing_details: contactInformation
						}
					}
				)
				if (payload.error) {
					setCardInputError(`Payment error: ${payload.error.message}`)
					setProcessing(false)
					return
				}
			}
			setCardInputError('')
			setProcessing(false)
			setOrder({
				...order,
				contactInformation: contactInformation,
				shippingMethod: shippingMethod,
				paymentMethod: paymentMethod,
				createdAt: createdOrderResult.data.order.createdAt,
				pickupNumber: createdOrderResult.data.order.pickupNumber
			})
			clearCart()
			next()
		} else {
			showSnackbar(SnackType.PAYMENT_FAILED)
			setProcessing(false)
		}
	}
}
