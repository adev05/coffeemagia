'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { Minus, Plus } from 'lucide-react'
import type { Product } from '@/types/product'

interface AddToCartButtonProps {
	product: Product
	className?: string
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
	const { items, addItem, removeItem, updateQuantity } = useCartStore()

	const cartItem = items.find(item => item.id === product.id)
	const quantity = cartItem?.quantity || 0

	const handleAdd = (e: React.MouseEvent) => {
		e.stopPropagation()
		addItem(product)
	}

	const handleIncrease = (e: React.MouseEvent) => {
		e.stopPropagation()
		updateQuantity(product.id, quantity + 1)
	}

	const handleDecrease = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (quantity === 1) {
			removeItem(product.id)
		} else {
			updateQuantity(product.id, quantity - 1)
		}
	}

	if (quantity === 0) {
		return (
			<Button
				variant='secondary'
				className={className}
				size='lg'
				onClick={handleAdd}
			>
				Добавить в корзину
			</Button>
		)
	}

	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<Button variant='secondary' size='icon' onClick={handleDecrease}>
				<Minus className='h-4 w-4' />
			</Button>
			<div className='flex-1 text-center font-semibold'>
				{quantity} × {product.price} ₽
			</div>
			<Button variant='secondary' size='icon' onClick={handleIncrease}>
				<Plus className='h-4 w-4' />
			</Button>
		</div>
	)
}
