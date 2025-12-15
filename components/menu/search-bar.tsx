'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function SearchBar() {
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = () => {
		console.log('Поиск:', searchQuery)
	}

	return (
		<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center'>
			<Input
				className='lg:col-span-3'
				placeholder='Поиск по названию'
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
				onKeyDown={e => e.key === 'Enter' && handleSearch()}
			/>
			<Button
				variant='default'
				size='lg'
				className='lg:col-span-1'
				onClick={handleSearch}
			>
				<Search className='w-4 h-4 mr-2' />
				Поиск
			</Button>
		</div>
	)
}
