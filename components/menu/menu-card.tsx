'use client'

import {
	Card,
	CardContent,
	CardFooter,
	CardTitle,
	CardDescription,
} from '@/components/ui/card'
import Image from 'next/image'
import { ProductDialog } from './product-dialog'
import { AddToCartButton } from './add-to-cart-button'
import { useState } from 'react'
import type { Product } from '@/types/product'

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
				/>
				<CardContent>
					<CardTitle className='text-xl'>{product.name}</CardTitle>
					<CardDescription>{product.volume}</CardDescription>
					<p className='text-xl mt-2'>{product.price} ₽</p>
				</CardContent>
				<CardFooter>
					<AddToCartButton product={product} className='w-full' />
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
