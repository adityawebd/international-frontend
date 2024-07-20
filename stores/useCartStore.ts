import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "../types"

interface State {
	cart: Product[]
	totalItems: number
	totalPrice: number
}

interface Actions {
	addToCart: (Item: Product) => void
	removeFromCart: (Item: Product) => void
	updateQuantity: (Item: Product) => void
	removeQuantity: (Item: Product) => void
}

const INITIAL_STATE: State = {
	cart: [],
	totalItems: 0,
	totalPrice: 0,
}

export const useCartStore = create(
	
	persist<State & Actions>(
		(set, get) => ({
			cart: INITIAL_STATE.cart,
			totalItems: INITIAL_STATE.totalItems,
			totalPrice: INITIAL_STATE.totalPrice,
			addToCart: (product: Product) => {
				const cart = get().cart
				const cartItem = cart.find(item => item._id === product._id)

				if (cartItem) {
					const updatedCart = cart.map(item =>
						item._id === product._id ? { ...item, quantity: (item.quantity as number) + 1 } : item
					)
					set(state => ({
						cart: updatedCart,
						totalItems: state.totalItems + 1,
						totalPrice: state.totalPrice + product.price,
					}))
				} else {
					const updatedCart = [...cart, { ...product, quantity: 1 }]

					set(state => ({
						cart: updatedCart,
						totalItems: state.totalItems + 1,
						totalPrice: state.totalPrice + product.price,
					}))
				}
			},


			updateQuantity: (product: Product) => {
				
				const cart = get().cart
				const cartItem = cart.find(item => item._id === product._id)

				if(product.quantity>4)
					{

					}
					else{
						if (cartItem) {
							const updatedCart = cart.map(item =>
								item._id === product._id ? { ...item, quantity: (item.quantity as number) + 1 } : item
							)
							set(state => ({
								cart: updatedCart,
								totalItems: state.totalItems + 1,
								totalPrice: state.totalPrice + product.price,
							}))
						} else {
							const updatedCart = [...cart, { ...product, quantity: 1 }]
		
							set(state => ({
								cart: updatedCart,
								totalItems: state.totalItems + 1,
								totalPrice: state.totalPrice + product.price,
							}))
						}


					}

				
			},




			removeQuantity: (product: Product) => {


				
				const cart = get().cart
				const cartItem = cart.find(item => item._id === product._id)

				if(product.quantity<1)
					{}



					else{
						
				if (cartItem) {
					const updatedCart = cart.map(item =>
						item._id === product._id ? { ...item, quantity: (item.quantity as number) - 1 } : item
					)
					set(state => ({
						cart: updatedCart,
						totalItems: state.totalItems - 1,
						totalPrice: state.totalPrice - product.price,
					}))
				} else {
					const updatedCart = [...cart, { ...product, quantity: 1 }]

					set(state => ({
						cart: updatedCart,
						totalItems: state.totalItems - 1,
						totalPrice: state.totalPrice - product.price,
					}))
				}
				}

			},

			
			removeFromCart: (product: Product) => {
				set(state => ({
					cart: state.cart.filter(item => item._id !== product._id),
					totalItems: state.totalItems - state.totalItems,
					totalPrice: state.totalPrice - state.totalPrice,
				}))
			},
		}),
		{
			name: "cart-storage",
			// getStorage: () => sessionStorage, (optional) by default the 'localStorage' is used
			// version: 1, // State version number,
			// migrate: (persistedState: unknown, version: number) => {
			// 	if (version === 0) {
			// 		// if the stored value is in version 0, we rename the field to the new name
			// 		persistedState.totalProducts = persistedState.totalItems
			// 		delete persistedState.totalItems
			// 	}

			// 	return persistedState as State & Actions
			// },
		}
	)
)
