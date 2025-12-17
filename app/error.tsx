'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
	return (
		<div>
			<h2>Что-то пошло не так!</h2>
			<button onClick={reset}>Попробовать снова</button>
		</div>
	)
}
