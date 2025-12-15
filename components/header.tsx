import { Button } from '@/components/ui/button'
import { Logotype } from './logotype'
import { ShoppingCart } from 'lucide-react'

export function Header() {
	return (
		<header className='w-full'>
			<div className='container mx-auto py-4 flex items-center justify-between px-4'>
				<Logotype />
				<Button variant='ghost' size='lg'>
					<ShoppingCart width={16} height={16} />
					Корзина
				</Button>
			</div>
		</header>
	)
}
