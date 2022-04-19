export const Categories = [
	{ name: 'all-products', label: 'All Products' },
	{ name: 'new-arrivals', label: 'New Arrivals' }
]

export const SampleProducts = [
	{
		id: 'f06e908f-6027-4626-9e9b-5ae14c783455',
		name: 'Iron Waffle Maker',
		price: '43.9',
		coverImage: '/images/sample-products/product1.png',
		category: 'appliance',
		discount: '0',
		newArrival: false
	},
	{
		id: 'a8248a7c-b328-4dd3-83ab-a6f60e8267cd',
		name: 'Compact Air Fryer',
		price: '118.8',
		coverImage: '/images/sample-products/product2.png',
		category: 'appliance',
		discount: '0',
		newArrival: true
	},
	{
		id: 'e522f9b4-aa1a-44ff-ae8c-e6b8c007b5dd',
		name: 'Plastic Storage Box',
		price: '11.9',
		coverImage: '/images/sample-products/product3.png',
		category: 'furniture',
		discount: '0',
		newArrival: true
	},
	{
		id: '29193f5a-52c2-4fd3-94dc-71af2da7706c',
		name: 'Family Pack Electric Toothbrush',
		price: '122.8',
		coverImage: '/images/sample-products/product4.png',
		category: 'gifts',
		discount: '0',
		newArrival: true
	},
	{
		id: 'eeef96f9-38d0-4f2a-8467-3285af945ff0',
		name: 'Knitted Gloves',
		price: '9.9',
		coverImage: '/images/sample-products/product5.png',
		category: 'clothing',
		discount: '1',
		newArrival: true
	},
	{
		id: 'f00dccc3-fa61-4a86-b88f-8fb8df7db430',
		name: 'Power Hand Mixer',
		price: '19.8',
		coverImage: '/images/sample-products/product6.png',
		category: 'appliance',
		discount: '0',
		newArrival: false
	},
	{
		id: '6df43989-3e2d-46c6-a040-d5f82d1ff5d4',
		name: 'Mug with Lid',
		price: '9.9',
		coverImage: '/images/sample-products/product7.png',
		category: 'appliance',
		discount: '0',
		newArrival: false
	},
	{
		id: '9a9434cc-3e2d-4fbf-bfb6-3070ef59d6ce',
		name: 'Snowman Tabletop Decor',
		price: '12.8',
		coverImage: '/images/sample-products/product8.png',
		category: 'decors',
		discount: '3',
		newArrival: false
	},
	{
		id: '92b44d2e-afeb-4e2c-9090-3a534de9b747',
		name: 'Tough Nitrile Gloves',
		price: '18.8',
		coverImage: '/images/sample-products/product9.png',
		category: 'organization',
		discount: '3',
		newArrival: false
	},
	{
		id: 'c956e688-2dcc-4f7e-91fd-1b93c1a91b13',
		name: 'Sleeveless Garment',
		price: '13.5',
		coverImage: '/images/sample-products/product10.png',
		category: 'clothing',
		discount: '3',
		newArrival: false
	},
	{
		id: '7a8229df-5172-4afb-bbdb-4b1805f8cb3a',
		name: 'Globe in Wire',
		price: '26.9',
		coverImage: '/images/sample-products/product11.png',
		category: 'decors',
		discount: '0',
		newArrival: false
	},
	{
		id: 'b1923bb4-62b9-44fc-bed8-152461b99ee2',
		name: 'Hedgehog Ball with Stand',
		price: '21.9',
		coverImage: '/images/sample-products/product12.png',
		category: 'decors',
		discount: '0',
		newArrival: false
	},
	{
		id: 'd0bd638d-4488-406c-ba63-95b7f9a6fedf',
		name: 'Small Succulent Plant Pot',
		price: '12.8',
		coverImage: '/images/sample-products/product13.png',
		category: 'decors',
		discount: '0',
		newArrival: false
	},
	{
		id: '7dcf8878-23cc-4e3c-9fa4-08d74189863a',
		name: 'Metal Trash Can with Lid',
		price: '43.9',
		coverImage: '/images/sample-products/product14.png',
		category: 'furniture',
		discount: '0',
		newArrival: false
	},
	{
		id: '6d803409-7ce1-47cd-9182-29005851e5de',
		name: 'Welcome Mat',
		price: '12.8',
		coverImage: '/images/sample-products/product15.png',
		category: 'furniture',
		discount: '0',
		newArrival: false
	},
	{
		id: '5acc4484-d5dd-4d17-9b5e-20b61d4e2f91',
		name: 'Folding Luggage Rack',
		price: '24.9',
		coverImage: '/images/sample-products/product16.png',
		category: 'furniture',
		discount: '0',
		newArrival: false
	},
	{
		id: '941467d2-0549-44e0-b837-f5479d31060d',
		name: "Men's Sweatpants",
		price: '38.9',
		coverImage: '/images/sample-products/product17.png',
		category: 'clothing',
		discount: '0',
		newArrival: false
	},
	{
		id: 'cbbaec84-cc00-41cf-a032-263c6e42668e',
		name: "Women's Jogging Pants",
		price: '35.9',
		coverImage: '/images/sample-products/product18.png',
		category: 'clothing',
		discount: '0',
		newArrival: false
	}
]

export enum PaymentMethod {
	creditCard = 'credit-card',
	payAtPickup = 'pay-at-pickup'
}

export enum ResponseStatus {
	SUCCESS = 'success',
	FAIL = 'fail',
	NOT_FOUND = 'not-found',
	ERROR = 'error',
	UNAUTHORIZED = 'unauthorized',
	OUT_OF_STOCK = 'out-of-stock'
}

export enum SnackType {
	ADD_TO_CART = 'add-to-cart',
	OUT_OF_STOCK = 'out-of-stock',
	PAYMENT_FAILED = 'payment-failed'
}

export enum SnackSeverity {
	SUCCESS = 'success',
	ERROR = 'error'
}
