'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ModeToggle() {
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()

	useEffect(() => {
		requestAnimationFrame(() => setMounted(true))
	}, [])

	if (!mounted) {
		return <Button variant='ghost' size='icon'></Button>
	}

	return (
		<>
			{mounted && (
				<Button
					variant='ghost'
					size='icon'
					onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
					aria-label='Toggle theme'
				>
					{resolvedTheme === 'light' ? <Sun /> : <Moon />}
				</Button>
			)}
		</>
	)
}
