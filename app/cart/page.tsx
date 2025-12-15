import { CartContent } from '@/components/cart/cart-content'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Корзина - Кофемагия',
	description: 'Оформление заказа',
}

export default function CartPage() {
	return (
		<div className='container mx-auto py-4 px-4'>
			<CartContent />
		</div>
	)
}
