'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

interface OptimizedImageProps {
	src: string
	alt: string
	fill?: boolean
	width?: number
	height?: number
	sizes?: string
	priority?: boolean
	className?: string
	fallbackClassName?: string
}

export function OptimizedImage({
	src,
	alt,
	fill,
	width,
	height,
	sizes,
	priority = false,
	className = '',
	fallbackClassName = '',
}: OptimizedImageProps) {
	const [imageError, setImageError] = useState(false)
	const [imageLoading, setImageLoading] = useState(true)

	if (imageError) {
		return (
			<div
				className={`flex flex-col items-center justify-center bg-muted ${fallbackClassName}`}
			>
				<ImageIcon className='w-12 h-12 text-muted-foreground/40 mb-2' />
				<span className='text-xs text-muted-foreground'>
					Изображение недоступно
				</span>
			</div>
		)
	}

	return (
		<>
			<Image
				src={src}
				alt={alt}
				fill={fill}
				width={width}
				height={height}
				sizes={sizes}
				priority={priority}
				className={`${className} transition-opacity duration-300 ${
					imageLoading ? 'opacity-0' : 'opacity-100'
				}`}
				onLoad={() => setImageLoading(false)}
				onError={() => {
					setImageError(true)
					setImageLoading(false)
				}}
			/>
			{imageLoading && (
				<div className='absolute inset-0 bg-muted animate-pulse' />
			)}
		</>
	)
}
