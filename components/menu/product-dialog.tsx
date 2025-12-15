import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { AddToCartButton } from './add-to-cart-button'
import type { Product } from '@/types/product'

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
				<div className='relative w-full aspect-video bg-muted rounded-lg overflow-hidden'>
					<Image
						src={product.image}
						alt={product.name}
						fill
						className='object-cover'
						style={{ objectFit: 'cover' }}
						priority
					/>
				</div>
				<DialogHeader>
					<DialogTitle className='text-2xl'>{product.name}</DialogTitle>
					<DialogDescription className='text-base pt-2'>
						{product.description}
					</DialogDescription>
					<p className='text-2xl pt-4'>{product.price} ₽</p>
				</DialogHeader>
				<DialogFooter>
					<AddToCartButton product={product} className='w-full' />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
