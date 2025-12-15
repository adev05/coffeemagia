import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MenuCard } from '@/components/menu/menu-card'

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

const mockProducts = Array(8)
	.fill(null)
	.map((_, i) => ({
		id: `product-${i}`,
		name: 'Мокачино',
		description:
			'Классика в нашем изысканном исполнении. Насыщенный эспрессо, тёмный спешелти шоколад из Никарагуа и ароматное какао из Коста-Рики.',
		volume: '170мл',
		price: 250,
		image: '/mocachino.jpg',
	}))

export function MenuTabs() {
	return (
		<Tabs defaultValue='1' className='w-full'>
			<TabsList className='flex-wrap h-auto'>
				{categories.map(category => (
					<TabsTrigger key={category.id} value={category.id}>
						{category.name}
					</TabsTrigger>
				))}
			</TabsList>

			{categories.map(category => (
				<TabsContent key={category.id} value={category.id}>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
						{mockProducts.map(product => (
							<MenuCard key={product.id} product={product} />
						))}
					</div>
				</TabsContent>
			))}
		</Tabs>
	)
}
