'use client'

import { Logotype } from '@/components/shared/logotype'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export function Header() {
	const items = useCartStore(state => state.items)
	const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

	return (
		<header className='w-full'>
			<div className='container mx-auto py-4 flex items-center justify-between px-4'>
				<Logotype />
				<nav className='flex gap-2 items-center'>
					<Button
						variant='ghost'
						size='lg'
						className='relative'
						aria-label={`Корзина, товаров: ${cartItemsCount}`}
						asChild
					>
						<Link href='/cart'>
							<ShoppingCart className='w-5 h-5' />
							<span>Корзина</span>
							{cartItemsCount > 0 && (
								<Badge variant='secondary'>{cartItemsCount}</Badge>
							)}
						</Link>
					</Button>
					<ModeToggle />
				</nav>
			</div>
		</header>
	)
}
