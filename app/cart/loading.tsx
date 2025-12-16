import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
	return (
		<div className='w-full h-[calc(100vh-76px)] flex justify-center items-center'>
			<Spinner />
		</div>
	)
}
