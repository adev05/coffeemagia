import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const imageUrl = searchParams.get('url')

	if (!imageUrl) {
		return new NextResponse('Missing url parameter', { status: 400 })
	}

	try {
		const url = new URL(imageUrl)
		if (!url.hostname.includes('coffeemania.ru')) {
			return new NextResponse('Invalid image source', { status: 403 })
		}
	} catch {
		return new NextResponse('Invalid URL', { status: 400 })
	}

	try {
		const response = await fetch(imageUrl, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
				Accept:
					'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
				'Accept-Encoding': 'gzip, deflate, br',
				Referer: 'https://coffeemania.ru/',
			},
			// Таймаут 10 секунд
			signal: AbortSignal.timeout(10000),
		})

		if (!response.ok) {
			console.error(
				`Failed to fetch image: ${response.status} ${response.statusText}`
			)
			return new NextResponse('Failed to fetch image', {
				status: response.status,
			})
		}

		const buffer = await response.arrayBuffer()
		const contentType = response.headers.get('content-type') || 'image/jpeg'

		return new NextResponse(buffer, {
			status: 200,
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=31536000, immutable',
				'CDN-Cache-Control': 'public, max-age=31536000',
			},
		})
	} catch (error) {
		console.error('Image proxy error:', error)

		const transparentPixel = Buffer.from(
			'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
			'base64'
		)

		return new NextResponse(transparentPixel, {
			status: 200,
			headers: {
				'Content-Type': 'image/png',
				'Cache-Control': 'public, max-age=60',
			},
		})
	}
}
