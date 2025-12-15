import { Button } from '@/components/ui/button'
import { Logotype } from '@/components/logotype'
import { ShoppingCart } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'

export function Header() {
	return (
		<header className='w-full'>
			<div className='container mx-auto py-4 flex items-center justify-between px-4'>
				<Logotype />
				<div className='flex gap-2 items-center'>
					<Button variant='ghost' size='lg'>
						<ShoppingCart width={16} height={16} />
						<span>Корзина</span>
					</Button>
					<ModeToggle />
				</div>
			</div>
		</header>
	)
}
