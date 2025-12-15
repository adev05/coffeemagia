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
]

// Имитация задержки API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getProducts(
	categoryId?: string,
	search?: string
): Promise<Product[]> {
	await delay(300) // Имитация сетевой задержки

	let filtered = [...mockProducts]

	// Фильтрация по категории
	if (categoryId && categoryId !== '1') {
		filtered = filtered.filter(p => p.category === categoryId)
	}

	// Фильтрация по поисковому запросу
	if (search) {
		const searchLower = search.toLowerCase()
		filtered = filtered.filter(
			p =>
				p.name.toLowerCase().includes(searchLower) ||
				p.description.toLowerCase().includes(searchLower)
		)
	}

	return filtered
}

export async function getProductById(id: string): Promise<Product | null> {
	await delay(200)
	return mockProducts.find(p => p.id === id) || null
}
