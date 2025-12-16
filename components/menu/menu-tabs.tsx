'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MenuCard } from './menu-card'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { getProducts } from '@/lib/api'
import { Loader2 } from 'lucide-react'
import type { Product } from '@/types/product'
import { Spinner } from '../ui/spinner'

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
	initialProducts: Product[]
}

export function MenuTabs({ initialTab, initialProducts }: MenuTabsProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [products, setProducts] = useState<Product[]>(initialProducts)
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const observerTarget = useRef<HTMLDivElement>(null)

	const search = searchParams.get('search') || ''

	// Сброс при смене табов или поиска
	useEffect(() => {
		setProducts(initialProducts)
		setPage(1)
		setHasMore(true)
	}, [initialTab, search, initialProducts])

	// Загрузка следующей страницы
	const loadMore = async () => {
		if (isLoading || !hasMore) return

		setIsLoading(true)
		try {
			const nextPage = page + 1
			const result = await getProducts(initialTab, search, nextPage, 16)
			setProducts(prev => [...prev, ...result.products])
			setPage(nextPage)
			setHasMore(result.hasMore)
		} catch (error) {
			console.error('Error loading more products:', error)
		} finally {
			setIsLoading(false)
		}
	}

	// Intersection Observer для автозагрузки
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					loadMore()
				}
			},
			{ threshold: 0.1 }
		)

		const currentTarget = observerTarget.current
		if (currentTarget) {
			observer.observe(currentTarget)
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget)
			}
		}
	}, [hasMore, isLoading, page])

	const handleTabChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('tab', value)
		router.push(`/?${params.toString()}`)
	}

	return (
		<Tabs value={initialTab} onValueChange={handleTabChange} className='w-full'>
			<TabsList className='flex-wrap h-auto'>
				{categories.map(category => (
					<TabsTrigger key={category.id} value={category.id}>
						{category.name}
					</TabsTrigger>
				))}
			</TabsList>

			<TabsContent value={initialTab} className='mt-6'>
				{products.length > 0 ? (
					<>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
							{products.map(product => (
								<MenuCard key={product.id} product={product} />
							))}
						</div>

						{/* Trigger для загрузки */}
						<div ref={observerTarget} className='flex justify-center py-8'>
							{isLoading && (
								<div className='flex items-center gap-2 text-muted-foreground'>
									<Spinner />
									{/* <span>Загрузка товаров...</span> */}
								</div>
							)}
							{/* {!hasMore && products.length > 0 && (
								<p className='text-muted-foreground'>Все товары загружены</p>
							)} */}
						</div>
					</>
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
