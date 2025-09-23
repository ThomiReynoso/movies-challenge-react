/// <reference types="@testing-library/jest-dom" />
import wishlistReducer, { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } from './wishlistSlice'
import type { Movie } from '../types/Movie'

const mockMovie1: Movie = {
  id: 1,
  title: 'Test Movie 1',
  overview: 'Test overview 1',
  poster_path: '/test1.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5
}

const mockMovie2: Movie = {
  id: 2,
  title: 'Test Movie 2',
  overview: 'Test overview 2', 
  poster_path: '/test2.jpg',
  release_date: '2023-02-01',
  vote_average: 7.5
}

describe('wishlistSlice', () => {
  it('should return the initial state', () => {
    expect(wishlistReducer(undefined, { type: 'unknown' })).toEqual({
      movies: []
    })
  })

  it('should handle addToWishlist', () => {
    const actual = wishlistReducer(undefined, addToWishlist(mockMovie1))
    expect(actual.movies).toEqual([mockMovie1])
  })

  it('should not add duplicate movies with addToWishlist', () => {
    const initialState = { movies: [mockMovie1] }
    const actual = wishlistReducer(initialState, addToWishlist(mockMovie1))
    expect(actual.movies).toEqual([mockMovie1])
  })

  it('should handle removeFromWishlist', () => {
    const initialState = { movies: [mockMovie1, mockMovie2] }
    const actual = wishlistReducer(initialState, removeFromWishlist(1))
    expect(actual.movies).toEqual([mockMovie2])
  })

  it('should handle removeFromWishlist when movie not found', () => {
    const initialState = { movies: [mockMovie1] }
    const actual = wishlistReducer(initialState, removeFromWishlist(999))
    expect(actual.movies).toEqual([mockMovie1])
  })

  it('should handle toggleWishlist - add movie', () => {
    const actual = wishlistReducer(undefined, toggleWishlist(mockMovie1))
    expect(actual.movies).toEqual([mockMovie1])
  })

  it('should handle toggleWishlist - remove movie', () => {
    const initialState = { movies: [mockMovie1] }
    const actual = wishlistReducer(initialState, toggleWishlist(mockMovie1))
    expect(actual.movies).toEqual([])
  })

  it('should handle toggleWishlist with multiple movies', () => {
    const initialState = { movies: [mockMovie1, mockMovie2] }
    const actual = wishlistReducer(initialState, toggleWishlist(mockMovie1))
    expect(actual.movies).toEqual([mockMovie2])
  })

  it('should handle clearWishlist', () => {
    const initialState = { movies: [mockMovie1, mockMovie2] }
    const actual = wishlistReducer(initialState, clearWishlist())
    expect(actual.movies).toEqual([])
  })

  it('should handle clearWishlist when already empty', () => {
    const actual = wishlistReducer(undefined, clearWishlist())
    expect(actual.movies).toEqual([])
  })
})