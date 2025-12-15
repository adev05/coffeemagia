'use client'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ProductDialog } from '@/components/menu/product-dialog'
import { useState } from 'react'

interface Product {
	id: string
	name: string
	description: string
	volume: string
	price: number
	image: string
}

interface MenuCardProps {
	product: Product
}

export function MenuCard({ product }: MenuCardProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	return (
		<>
			<Card
				className='cursor-pointer hover:shadow-lg transition-shadow'
				onClick={() => setIsDialogOpen(true)}
			>
				<CardHeader className='relative h-48 overflow-hidden p-0'>
					<Image
						src={product.image}
						alt={product.name}
						fill
						className='object-cover rounded-t-lg'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
					/>
				</CardHeader>
				<CardContent className='pt-4'>
					<CardTitle className='text-lg'>{product.name}</CardTitle>
					<CardDescription>{product.volume}</CardDescription>
					<p className='text-xl font-semibold mt-2'>{product.price} ₽</p>
				</CardContent>
				<CardFooter>
					<Button
						variant='secondary'
						className='w-full'
						size='lg'
						onClick={e => {
							e.stopPropagation()
						}}
					>
						Добавить в корзину
					</Button>
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
