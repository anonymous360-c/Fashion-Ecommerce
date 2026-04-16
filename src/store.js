import { configureStore, createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const incoming = action.payload
      const existing = state.items.find(
        item => item.id === incoming.id && item.size === incoming.size && item.color === incoming.color
      )
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...incoming, quantity: 1 })
      }
    },
    increaseQuantity(state, action) {
      const { id, size, color } = action.payload
      const item = state.items.find(i => i.id === id && i.size === size && i.color === color)
      if (item) item.quantity += 1
    },
    decreaseQuantity(state, action) {
      const { id, size, color } = action.payload
      const item = state.items.find(i => i.id === id && i.size === size && i.color === color)
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            i => !(i.id === id && i.size === size && i.color === color)
          )
        } else {
          item.quantity -= 1
        }
      }
    },
    removeItem(state, action) {
      const { id, size, color } = action.payload
      state.items = state.items.filter(
        i => !(i.id === id && i.size === size && i.color === color)
      )
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem, clearCart } = cartSlice.actions

export const selectCartItems     = state => state.cart.items
export const selectCartCount     = state => state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartTotal     = state => state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
})

export default store
