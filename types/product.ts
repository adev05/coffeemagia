export interface Product {
	id: string
	name: string
	description: string
	volume: string
	price: number
	image: string
	category: string
}

export interface CartItem extends Product {
	quantity: number
}
