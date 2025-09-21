import { configureStore, combineReducers } from '@reduxjs/toolkit'
import wishlistReducer from './wishlistSlice'

const rootReducer = combineReducers({
  wishlist: wishlistReducer
})

export const createStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export const store = createStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch