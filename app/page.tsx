import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

export default function Home() {
	return (
		<div className='container mx-auto flex flex-col gap-4 py-4 px-4'>
			<div className='grid grid-cols-4 gap-4 items-center'>
				<Input className='col-span-3' placeholder='Поиск по названию' />
				<Button variant='default' size='lg' className='col-span-1'>
					Поиск
				</Button>
			</div>
			<Tabs defaultValue='1' className='w-full'>
				<TabsList>
					<TabsTrigger value='1'>Новинки и хиты</TabsTrigger>
					<TabsTrigger value='2'>Закуски и салаты</TabsTrigger>
					<TabsTrigger value='3'>Горячие блюда</TabsTrigger>
					<TabsTrigger value='4'>Ужин</TabsTrigger>
					<TabsTrigger value='5'>Бургеры и не только</TabsTrigger>
					<TabsTrigger value='6'>Для компании</TabsTrigger>
					<TabsTrigger value='7'>Супы</TabsTrigger>
					<TabsTrigger value='8'>Начинки и соусы</TabsTrigger>
					<TabsTrigger value='9'>Кофе</TabsTrigger>
					<TabsTrigger value='10'>Начинки и соусы</TabsTrigger>
				</TabsList>
				<TabsContent value='1'>
					<div className='grid grid-cols-4 gap-4'>
						{new Array(8).fill(0).map((item, index) => {
							return (
								<Card key={index}>
									<CardHeader className='relative h-48 overflow-hidden '>
										<Image
											src='/mocachino.jpg'
											alt='mocachino'
											fill={true}
											objectFit='cover'
											className='rounded-2xl'
										/>
									</CardHeader>
									<CardContent>
										<CardTitle>Мокачино</CardTitle>
										<CardDescription>170мл</CardDescription>
									</CardContent>
									<CardFooter>
										<Button variant='secondary' className='w-full' size='lg'>
											Добавить в корзину
										</Button>
									</CardFooter>
								</Card>
							)
						})}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
