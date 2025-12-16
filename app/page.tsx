import { SearchBar } from '@/components/menu/search-bar'
import { MenuTabs } from '@/components/menu/menu-tabs'
import { getProducts } from '@/lib/api'

interface PageProps {
	searchParams: Promise<{
		search?: string
		tab?: string
	}>
}

export default async function Home({ searchParams }: PageProps) {
	const params = await searchParams
	const search = params.search || ''
	const tab = params.tab || 'Кофе'

	// Получаем первую страницу (12 товаров)
	const { products } = await getProducts(tab, search, 1, 12)

	return (
		<div className='container mx-auto flex flex-col gap-6 py-6 px-4'>
			<SearchBar initialSearch={search} />
			<MenuTabs initialTab={tab} initialProducts={products} />
		</div>
	)
}
