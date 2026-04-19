import { configureStore, createSlice } from '@reduxjs/toolkit'

// ─── Cart ─────────────────────────────────────────────────────
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const incoming = action.payload
      const existing = state.items.find(
        i => i.id === incoming.id && i.size === incoming.size && i.color === incoming.color
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

// ─── Auth ─────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,       // { uid, email, displayName }
    loading: true,    // true while Firebase checks session on boot
  },
  reducers: {
    setUser(state, action) {
      state.user    = action.payload
      state.loading = false
    },
    clearUser(state) {
      state.user    = null
      state.loading = false
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
  },
})

// ─── Exports ──────────────────────────────────────────────────
export const { addToCart, increaseQuantity, decreaseQuantity, removeItem, clearCart } = cartSlice.actions
export const { setUser, clearUser, setLoading } = authSlice.actions

export const selectCartItems  = state => state.cart.items
export const selectCartCount  = state => state.cart.items.reduce((s, i) => s + i.quantity, 0)
export const selectCartTotal  = state => state.cart.items.reduce((s, i) => s + i.price * i.quantity, 0)
export const selectUser       = state => state.auth.user
export const selectAuthLoading= state => state.auth.loading

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
})

export default store
