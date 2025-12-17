'use client'

import { AddToCartButton } from '@/components/menu/add-to-cart-button'
import { ProductDialog } from '@/components/menu/product-dialog'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from '@/components/ui/card'
import type { Product } from '@/types/product'
import Image from 'next/image'
import { useState } from 'react'

interface MenuCardProps {
	product: Product
}

export function MenuCard({ product }: MenuCardProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	return (
		<>
			<Card
				className='cursor-pointer transition-shadow pt-0 gap-4'
				onClick={() => setIsDialogOpen(true)}
			>
				<Image
					src={product.image}
					alt={product.name}
					width={800}
					height={200}
					className='rounded-2xl aspect-3/2'
					priority
				/>
				<CardContent>
					<CardTitle className='text-xl'>{product.name}</CardTitle>
					<CardDescription>{product.volume}</CardDescription>
					<p className='text-xl mt-2'>{product.price} ₽</p>
				</CardContent>
				<CardFooter className='mt-auto'>
					<AddToCartButton product={product} />
				</CardFooter>
			</Card>

			<ProductDialog
				product={product}
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			/>
		</>
	)
}
