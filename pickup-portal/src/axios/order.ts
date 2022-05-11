import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BASE_SERVER_URL
const getOrderByPhoneOrPickupNumber = (searchedString: string) =>
	axios.get('/api/orders/order-by-phone-pickup-number', {
		params: { searchedString }
	})

const checkOrderStock = (orderId: string) =>
	axios.get('/api/orders/check-order-stock', {
		params: { orderId }
	})
const pickupOrder = (orderId: string) =>
	axios.post('/api/orders/pickup-order', { orderId })

export { getOrderByPhoneOrPickupNumber, pickupOrder, checkOrderStock }
