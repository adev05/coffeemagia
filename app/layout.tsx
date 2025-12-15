import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/providers/theme-provider'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Кофемагия - Ресторан',
	description: 'Лучший кофе и вкусная еда в вашем городе',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={`${montserrat.variable} font-sans antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main>{children}</main>
				</ThemeProvider>
			</body>
		</html>
	)
}
