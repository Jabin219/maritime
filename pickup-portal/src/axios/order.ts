import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BASE_SERVER_URL
const getOrderByPhoneOrPickupNumber = (searchedString: string) => {
	axios.get('/api/orders/order-by-phone-pickup-number', {
		params: { searchedString }
	})
}

export { getOrderByPhoneOrPickupNumber }
