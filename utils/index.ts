export const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min
}
export const getFourRandomNumberArray = (min: number, max: number) => {
	const array: number[] = []
	while (array.length < 4) {
		const randomNumber = getRandomNumber(min, max)
		if (!array.find(num => num === randomNumber)) {
			array.push(randomNumber)
		}
	}
	return array
}
export const priceFormatter = (price: number) => {
	const locale = 'en-CA'
	const options = {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}
	const formattedPrice = new Intl.NumberFormat(locale, options).format(price)
	return formattedPrice
}
