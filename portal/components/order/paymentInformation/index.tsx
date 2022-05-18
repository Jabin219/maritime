import { Elements } from '@stripe/react-stripe-js'
import { ProductContext } from 'context/ProductContextProvider'
import { useContext } from 'react'
import PaymentInformation from './PaymentInformation'

const PaymentInfoContainer = () => {
	const { stripePromise } = useContext(ProductContext)
	return (
		<Elements stripe={stripePromise}>
			<PaymentInformation />
		</Elements>
	)
}

export default PaymentInfoContainer
