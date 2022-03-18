export const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min
}
const getFourRandomNumberArray = (min: number, max: number) => {
	const array: number[] = []
	while (array.length < 4) {
		const randomNumber = getRandomNumber(min, max)
		if (!array.find(num => num === randomNumber)) {
			array.push(randomNumber)
		}
	}
	return array
}
export const fourRandomNumberArray = getFourRandomNumberArray(0, 17)
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
