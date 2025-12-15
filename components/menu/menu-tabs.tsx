'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MenuCard } from './menu-card'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import type { Product } from '@/types/product'

const categories = [
	{ id: '1', name: 'Новинки и хиты' },
	{ id: '2', name: 'Закуски и салаты' },
	{ id: '3', name: 'Горячие блюда' },
	{ id: '4', name: 'Ужин' },
	{ id: '5', name: 'Бургеры и не только' },
	{ id: '6', name: 'Для компании' },
	{ id: '7', name: 'Супы' },
	{ id: '8', name: 'Десерты' },
	{ id: '9', name: 'Кофе' },
	{ id: '10', name: 'Напитки' },
]

interface MenuTabsProps {
	initialTab: string
	products: Product[]
}

export function MenuTabs({ initialTab, products }: MenuTabsProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [isPending, startTransition] = useTransition()

	const handleTabChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('tab', value)

		startTransition(() => {
			router.push(`/?${params.toString()}`)
		})
	}

	return (
		<Tabs value={initialTab} onValueChange={handleTabChange} className='w-full'>
			<TabsList className='flex-wrap h-auto'>
				{categories.map(category => (
					<TabsTrigger
						key={category.id}
						value={category.id}
						disabled={isPending}
					>
						{category.name}
					</TabsTrigger>
				))}
			</TabsList>

			<TabsContent value={initialTab} className='mt-6'>
				{products.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
						{products.map(product => (
							<MenuCard key={product.id} product={product} />
						))}
					</div>
				) : (
					<div className='text-center py-12 text-muted-foreground'>
						<p className='text-lg'>Ничего не найдено</p>
						<p className='text-sm mt-2'>Попробуйте изменить параметры поиска</p>
					</div>
				)}
			</TabsContent>
		</Tabs>
	)
}
