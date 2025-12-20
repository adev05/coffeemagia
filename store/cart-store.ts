import type { CartItem, Product } from '@/types/product'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { traceSync, addEvent } from '@/lib/telemetry'

interface CartStore {
	items: CartItem[]
	addItem: (product: Product) => void
	removeItem: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	clearCart: () => void
	getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: product =>
				traceSync('cart.addItem', (span) => {
					span.setAttribute('product.id', product.id)
					span.setAttribute('product.name', product.name)
					span.setAttribute('product.price', product.price)

					set(state => {
						const existingItem = state.items.find(item => item.id === product.id)

						if (existingItem) {
							addEvent('cart.item_updated', { 
								productId: product.id, 
								newQuantity: existingItem.quantity + 1 
							})
							return {
								items: state.items.map(item =>
									item.id === product.id
										? { ...item, quantity: item.quantity + 1 }
										: item
								),
							}
						}

						addEvent('cart.item_added', { productId: product.id })
						return {
							items: [...state.items, { ...product, quantity: 1 }],
						}
					})

					const cartSize = get().items.length
					span.setAttribute('cart.size', cartSize)
				}),

			removeItem: productId =>
				traceSync('cart.removeItem', (span) => {
					span.setAttribute('product.id', productId)
					
					set(state => ({
						items: state.items.filter(item => item.id !== productId),
					}))

					addEvent('cart.item_removed', { productId })
					const cartSize = get().items.length
					span.setAttribute('cart.size', cartSize)
				}),

			updateQuantity: (productId, quantity) =>
				traceSync('cart.updateQuantity', (span) => {
					span.setAttribute('product.id', productId)
					span.setAttribute('quantity', quantity)

					set(state => ({
						items: state.items.map(item =>
							item.id === productId ? { ...item, quantity } : item
						),
					}))

					addEvent('cart.quantity_updated', { productId, quantity })
				}),

			clearCart: () => 
				traceSync('cart.clear', (span) => {
					const itemCount = get().items.length
					span.setAttribute('items.cleared', itemCount)
					
					set({ items: [] })
					addEvent('cart.cleared', { itemCount })
				}),

			getTotalPrice: () => {
				const { items } = get()
				return items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				)
			},
		}),
		{
			name: 'cart-storage',
		}
	)
)
