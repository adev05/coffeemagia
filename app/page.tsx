import { SearchBar } from '@/components/menu/search-bar'
import { MenuTabs } from '@/components/menu/menu-tabs'

export default function Home() {
	return (
		<div className='container mx-auto flex flex-col gap-6 py-6 px-4'>
			<SearchBar />
			<MenuTabs />
		</div>
	)
}
