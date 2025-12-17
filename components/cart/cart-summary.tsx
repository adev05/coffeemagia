'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/cart-store'
import { ShoppingCart } from 'lucide-react'

export function CartSummary() {
	const { items, getTotalPrice, clearCart } = useCartStore()

	const totalPrice = getTotalPrice()
	const deliveryFee = totalPrice > 1000 ? 0 : 150
	const finalPrice = totalPrice + deliveryFee

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

	const handleCheckout = () => {
		alert('Оформление заказа')
	}

	return (
		<Card className='sticky top-4'>
			<CardHeader>
				<CardTitle>Итого</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>
						Товары ({totalItems} шт.)
					</span>
					<span className='font-medium'>{totalPrice} ₽</span>
				</div>

				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>Доставка</span>
					<span className='font-medium'>
						{deliveryFee === 0 ? (
							<span className='text-green-600'>Бесплатно</span>
						) : (
							`${deliveryFee} ₽`
						)}
					</span>
				</div>

				{totalPrice < 1000 && totalPrice > 0 && (
					<p className='text-xs text-muted-foreground'>
						Бесплатная доставка от 1000 ₽
					</p>
				)}

				<Separator />

				<div className='flex justify-between text-lg font-bold'>
					<span>Итого</span>
					<span>{finalPrice} ₽</span>
				</div>
			</CardContent>
			<CardFooter className='flex flex-col gap-2'>
				<Button className='w-full' size='lg' onClick={handleCheckout}>
					<ShoppingCart className='w-4 h-4 mr-2' />
					Оформить заказ
				</Button>
				<Button
					variant='ghost'
					size='lg'
					className='w-full'
					onClick={clearCart}
				>
					Очистить корзину
				</Button>
			</CardFooter>
		</Card>
	)
}
