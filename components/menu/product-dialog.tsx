import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface Product {
	id: string
	name: string
	description: string
	volume: string
	price: number
	image: string
}

interface ProductDialogProps {
	product: Product
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function ProductDialog({
	product,
	open,
	onOpenChange,
}: ProductDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-2xl'>
				<div className='relative w-full h-64'>
					<Image
						src={product.image}
						alt={product.name}
						fill
						className='object-cover rounded-lg'
					/>
				</div>
				<DialogHeader>
					<DialogTitle className='text-2xl'>{product.name}</DialogTitle>
					<DialogDescription className='text-base pt-2'>
						{product.description}
					</DialogDescription>
					<p className='text-2xl font-bold pt-4'>{product.price} ₽</p>
				</DialogHeader>
				<DialogFooter>
					<Button variant='secondary' className='w-full' size='lg'>
						Добавить в корзину
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
