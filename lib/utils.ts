import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getProxiedImageUrl(originalUrl: string): string {
	if (!originalUrl) {
		return '/placeholder.jpg' // Создай placeholder в /public
	}

	if (originalUrl.startsWith('/')) {
		return originalUrl
	}

	if (originalUrl.startsWith('data:')) {
		return originalUrl
	}

	return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`
}
