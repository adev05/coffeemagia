'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MenuCard } from './menu-card'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { getProducts } from '@/lib/api'
import type { Product } from '@/types/product'
import { Spinner } from '../ui/spinner'

const categories = [
	{ id: 'Кофе', name: 'Кофе' },
	{ id: 'Айс Кофе', name: 'Айс Кофе' },
	{ id: 'Чай', name: 'Чай' },
	{ id: 'Холодные напитки', name: 'Холодные напитки' },
	{ id: 'Детское меню', name: 'Детское меню' },
	{ id: 'Весовой чай и кофе в зёрнах', name: 'Весовой чай и кофе в зёрнах' },
	{ id: 'Кулинария', name: 'Кулинария' },
	{ id: 'Новинки и хиты', name: 'Новинки и хиты' },
	{ id: 'Закуски и салаты', name: 'Закуски и салаты' },
	{ id: 'Горячие блюда', name: 'Горячие блюда' },
	{ id: 'Ужин', name: 'Ужин' },
	{ id: 'Бургеры и не только', name: 'Бургеры и не только' },
	{ id: 'Для компании', name: 'Для компании' },
	{ id: 'Супы', name: 'Супы' },
	{ id: 'Начинки и соусы', name: 'Начинки и соусы' },
	{ id: 'Десерты и йогурт', name: 'Десерты и йогурт' },
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
