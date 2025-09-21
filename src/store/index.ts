import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './wishlistSlice'

// Función para crear store (para SSR)
export const createStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      wishlist: wishlistReducer
    },
    preloadedState
  })
}

// Store por defecto para cliente
export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch