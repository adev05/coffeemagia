'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchBarProps {
	initialSearch?: string
}

export function SearchBar({ initialSearch = '' }: SearchBarProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [searchQuery, setSearchQuery] = useState(initialSearch)
	const [isPending, startTransition] = useTransition()

	const handleSearch = () => {
		const params = new URLSearchParams(searchParams.toString())

		if (searchQuery) {
			params.set('search', searchQuery)
		} else {
			params.delete('search')
		}

		startTransition(() => {
			router.push(`/?${params.toString()}`)
		})
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	return (
		<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center'>
			<Input
				className='lg:col-span-3'
				placeholder='Поиск по названию'
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				variant='default'
				size='lg'
				className='lg:col-span-1'
				onClick={handleSearch}
				disabled={isPending}
			>
				{isPending ? (
					<Loader2 className='w-4 h-4 mr-2 animate-spin' />
				) : (
					<Search className='w-4 h-4 mr-2' />
				)}
				Поиск
			</Button>
		</div>
	)
}
