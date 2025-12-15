'use client'

import { useCartStore } from '@/store/cart-store'
import { CartItem } from '@/components/cart/cart-item'
import { CartSummary } from '@/components/cart/cart-summary'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export function CartContent() {
	const items = useCartStore(state => state.items)

	if (items.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-16 text-center'>
				<ShoppingBag className='w-24 h-24 text-muted-foreground mb-4' />
				<h2 className='text-2xl font-semibold mb-2'>Корзина пуста</h2>
				<p className='text-muted-foreground mb-6'>
					Добавьте товары из меню, чтобы оформить заказ
				</p>
				<Button asChild size='lg'>
					<Link href='/'>Перейти в меню</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className='grid lg:grid-cols-3 gap-4'>
			<div className='lg:col-span-2 space-y-4'>
				{items.map(item => (
					<CartItem key={item.id} item={item} />
				))}
			</div>
			<div className='lg:col-span-1'>
				<CartSummary />
			</div>
		</div>
	)
}
