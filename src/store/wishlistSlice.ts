import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '../types'

interface WishlistState {
  movies: Movie[]
}

const initialState: WishlistState = {
  movies: []
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload
      const existingMovie = state.movies.find(m => m.id === movie.id)
      
      if (!existingMovie) {
        state.movies.push(movie)
      }
    },
    
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      const movieId = action.payload
      state.movies = state.movies.filter(movie => movie.id !== movieId)
    },
    
    toggleWishlist: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload
      const existingIndex = state.movies.findIndex(m => m.id === movie.id)
      
      if (existingIndex >= 0) {
        state.movies.splice(existingIndex, 1)
      } else {
        state.movies.push(movie)
      }
    },
    
    clearWishlist: (state) => {
      state.movies = []
    }
  }
})

export const { 
  addToWishlist, 
  removeFromWishlist, 
  toggleWishlist, 
  clearWishlist
} = wishlistSlice.actions

export default wishlistSlice.reducer