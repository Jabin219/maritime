export const priceFormatter = (price: number) => {
	const locale = 'en-CA'
	const options = {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}
	const formattedPrice = new Intl.NumberFormat(locale, options).format(price)
	return formattedPrice
}
export const getBannerHeight = (widthHeightRate: number) => {
	if (document) {
		if (document.body.clientWidth >= 1920) {
			return 1920 / widthHeightRate
		} else {
			return document.body.clientWidth / 2.4
		}
	}
	return 0
}
export const taxCalculator = (amount: number) => {
	return amount * 0.15
}
