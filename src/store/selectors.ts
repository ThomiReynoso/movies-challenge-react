import type { RootState } from './index'

export const selectWishlistMovies = (state: RootState) => state.wishlist.movies

export const selectWishlistCount = (state: RootState) => state.wishlist.movies.length

export const selectIsMovieInWishlist = (state: RootState, movieId: number) => 
  state.wishlist.movies.some(movie => movie.id === movieId)