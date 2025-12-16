import { Product } from '@/types/product'

// Моковые данные
const mockProducts: Product[] = [
	{
		id: '1',
		name: 'Мокачино 1',
		description:
			'Классика в нашем изысканном исполнении. Насыщенный эспрессо, тёмный спешелти шоколад из Никарагуа и ароматное какао из Коста-Рики. Одноразовые стаканы, используемые для горячих напитков навынос, не предназначены для микроволновых печей. Нагревание такой упаковки может привести к её повреждению и даже стать причиной локального возгорания',
		volume: '170мл',
		price: 790,
		image: '/mocachino.jpg',
		category: '1',
	},
	{
		id: '2',
		name: 'Мокачино 2',
		description:
			'Классика в нашем изысканном исполнении. Насыщенный эспрессо, тёмный спешелти шоколад из Никарагуа и ароматное какао из Коста-Рики. Одноразовые стаканы, используемые для горячих напитков навынос, не предназначены для микроволновых печей. Нагревание такой упаковки может привести к её повреждению и даже стать причиной локального возгорания',
		volume: '170мл',
		price: 790,
		image: '/mocachino.jpg',
		category: '1',
	},
	{
		id: '3',
		name: 'Мокачино 3',
		description:
			'Классика в нашем изысканном исполнении. Насыщенный эспрессо, тёмный спешелти шоколад из Никарагуа и ароматное какао из Коста-Рики. Одноразовые стаканы, используемые для горячих напитков навынос, не предназначены для микроволновых печей. Нагревание такой упаковки может привести к её повреждению и даже стать причиной локального возгорания',
		volume: '170мл',
		price: 790,
		image: '/mocachino.jpg',
		category: '1',
	},

	...Array.from({ length: 200 }, (_, i) => ({
		id: `${i + 4}`,
		name: `Товар ${i + 4}`,
		description: 'Описание товара для теста infinite scroll.',
		volume: '200мл',
		price: 200 + i * 10,
		image: '/mocachino.jpg',
		category: '1',
	})),
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getProducts(
	categoryId?: string,
	search?: string,
	page: number = 1,
	limit: number = 16
): Promise<{ products: Product[]; hasMore: boolean; total: number }> {
	await delay(300)

	let filtered = [...mockProducts]

	if (categoryId && categoryId !== '1') {
		filtered = filtered.filter(p => p.category === categoryId)
	}

	if (search) {
		const searchLower = search.toLowerCase()
		filtered = filtered.filter(
			p =>
				p.name.toLowerCase().includes(searchLower) ||
				p.description.toLowerCase().includes(searchLower)
		)
	}

	const total = filtered.length
	const start = (page - 1) * limit
	const end = start + limit
	const products = filtered.slice(start, end)
	const hasMore = end < total

	return { products, hasMore, total }
}

export async function getProductById(id: string): Promise<Product | null> {
	await delay(200)
	return mockProducts.find(p => p.id === id) || null
}
