import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentInformation from './PaymentInformation'

const StripeElements = () => {
	const stripePromise = loadStripe(
		`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
	)
	return (
		<Elements stripe={stripePromise}>
			<PaymentInformation />
		</Elements>
	)
}

export default StripeElements
