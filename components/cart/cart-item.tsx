'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/store/cart-store'
import { useState } from 'react'
import type { CartItem as CartItemType } from '@/types/product'

interface CartItemProps {
	item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
	const { updateQuantity, removeItem } = useCartStore()
	const [imageError, setImageError] = useState(false)

	const handleIncrease = () => {
		updateQuantity(item.id, item.quantity + 1)
	}

	const handleDecrease = () => {
		if (item.quantity === 1) {
			removeItem(item.id)
		} else {
			updateQuantity(item.id, item.quantity - 1)
		}
	}

	const handleRemove = () => {
		removeItem(item.id)
	}

	const totalPrice = item.price * item.quantity

	return (
		<Card className='py-0'>
			<CardContent className='p-4'>
				<div className='flex gap-4'>
					<div className='relative w-24 h-24 shrink-0 bg-muted rounded-lg overflow-hidden'>
						{!imageError ? (
							<Image
								src={item.image}
								alt={item.name}
								fill
								sizes='96px'
								className='object-cover'
								onError={() => setImageError(true)}
							/>
						) : (
							<div className='absolute inset-0 flex items-center justify-center'>
								<ImageIcon className='w-8 h-8 text-muted-foreground/40' />
							</div>
						)}
					</div>

					<div className='flex-1 flex flex-col justify-between'>
						<div>
							<h3 className='font-semibold text-lg'>{item.name}</h3>
							<p className='text-sm text-muted-foreground'>{item.volume}</p>
							<p className='text-sm text-muted-foreground mt-1'>
								{item.price} ₽ за шт.
							</p>
						</div>

						<div className='flex items-center justify-between mt-2'>
							<div className='flex items-center gap-2'>
								<Button
									variant='outline'
									size='icon'
									className='h-8 w-8'
									onClick={handleDecrease}
								>
									<Minus className='h-3 w-3' />
								</Button>
								<span className='w-12 text-center font-medium'>
									{item.quantity}
								</span>
								<Button
									variant='outline'
									size='icon'
									className='h-8 w-8'
									onClick={handleIncrease}
								>
									<Plus className='h-3 w-3' />
								</Button>
							</div>

							<div className='flex items-center gap-4'>
								<span className='font-bold text-lg'>{totalPrice} ₽</span>
								<Button
									variant='ghost'
									size='icon'
									className='h-8 w-8 text-destructive hover:text-destructive'
									onClick={handleRemove}
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
