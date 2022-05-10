export enum FooterTabValue {
	home = 'home',
	orders = 'order-search',
	addNewProduct = 'add-new-product'
}
export enum OrderStatus {
	unpaid = 'unpaid',
	reserved = 'reserved',
	paid = 'paid',
	completed = 'completed',
	expired = 'expired'
}
export enum ResponseStatus {
	SUCCESS = 'success',
	FAIL = 'fail',
	NOT_FOUND = 'not-found',
	ERROR = 'error',
	UNAUTHORIZED = 'unauthorized',
	OUT_OF_STOCK = 'out-of-stock'
}

export const Categories = [
	{ name: 'clothing', label: 'Clothing', showedOnHeader: true },
	{ name: 'home-and-pets', label: 'Home & Pets', showedOnHeader: true },
	{ name: 'grocery', label: 'Grocery', showedOnHeader: true },
	{ name: 'appliances', label: 'Appliances', showedOnHeader: true },
	{ name: 'health-and-beauty', label: 'Health & Beauty', showedOnHeader: true },
	{ name: 'kids', label: 'Kids', showedOnHeader: true }
]
