'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface SearchBarProps {
	initialSearch?: string
}

export function SearchBar({ initialSearch = '' }: SearchBarProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [searchQuery, setSearchQuery] = useState(initialSearch)
	const [isSearching, setIsSearching] = useState(false)

	const debouncedSearch = useDebouncedCallback((value: string) => {
		const params = new URLSearchParams(searchParams.toString())

		if (value) {
			params.set('search', value)
			params.set('tab', 'all')
		} else {
			params.delete('search')
			if (!params.get('tab')) {
				params.set('tab', 'all')
			}
		}

		router.push(`/?${params.toString()}`)
		setIsSearching(false)
	}, 500)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSearchQuery(value)
		setIsSearching(true)
		debouncedSearch(value)
	}

	const handleClear = () => {
		setSearchQuery('')
		setIsSearching(false)
		const params = new URLSearchParams(searchParams.toString())
		params.delete('search')
		if (!params.get('tab')) {
			params.set('tab', 'all')
		}
		router.push(`/?${params.toString()}`)
	}

	const handleSubmit = () => {
		const params = new URLSearchParams(searchParams.toString())

		if (searchQuery) {
			params.set('search', searchQuery)
			params.set('tab', 'all')
		} else {
			params.delete('search')
		}

		router.push(`/?${params.toString()}`)
	}

	return (
		<div className='w-full relative'>
			<Input
				placeholder='Поиск по названию'
				value={searchQuery}
				onChange={handleChange}
				onKeyDown={e => e.key === 'Enter' && handleSubmit()}
			/>
			<div className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1'>
				{isSearching && <Spinner className='mr-1.5' />}
				{searchQuery && !isSearching && (
					<Button
						variant='ghost'
						size='icon'
						className='h-7 w-7'
						onClick={handleClear}
					>
						<X className='h-4 w-4' />
					</Button>
				)}
			</div>
		</div>
	)
}
