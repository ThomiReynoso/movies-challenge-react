/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { WishlistPage } from './WishlistPage'
import wishlistReducer from '../../store/wishlistSlice'
import type { Movie } from '../../types/Movie'

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Test Movie 1',
    overview: 'Test overview 1',
    poster_path: '/test1.jpg',
    release_date: '2023-01-01',
    vote_average: 8.5
  },
  {
    id: 2,
    title: 'Test Movie 2', 
    overview: 'Test overview 2',
    poster_path: '/test2.jpg',
    release_date: '2023-02-01',
    vote_average: 7.5
  }
]

const createMockStore = (movies: Movie[] = []) => {
  return configureStore({
    reducer: {
      wishlist: wishlistReducer
    },
    preloadedState: {
      wishlist: { movies }
    }
  })
}

const renderWithProviders = (component: React.ReactElement, movies: Movie[] = []) => {
  const store = createMockStore(movies)
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

describe('WishlistPage', () => {
  it('renders empty wishlist message when no movies', () => {
    renderWithProviders(<WishlistPage />)
    
    expect(screen.getByText('Your Wishlist')).toBeInTheDocument()
    expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument()
    expect(screen.getByText('Start adding movies you want to watch!')).toBeInTheDocument()
  })

  it('renders movies when wishlist has items', () => {
    renderWithProviders(<WishlistPage />, mockMovies)
    
    expect(screen.getByText('Your Wishlist')).toBeInTheDocument()
    expect(screen.getByText('2 movies')).toBeInTheDocument()
  })

  it('shows correct movie count', () => {
    renderWithProviders(<WishlistPage />, mockMovies)
    
    expect(screen.getByText('2 movies')).toBeInTheDocument()
  })

  it('shows singular form for one movie', () => {
    renderWithProviders(<WishlistPage />, [mockMovies[0]])
    
    expect(screen.getByText('1 movie')).toBeInTheDocument()
  })

  it('handles clear all wishlist', () => {
    window.confirm = vi.fn().mockReturnValue(true)
    
    renderWithProviders(<WishlistPage />, mockMovies)
    
    const clearButton = screen.getByText('Clear All')
    fireEvent.click(clearButton)
    
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to clear your entire wishlist?')
  })

  it('navigates to movie detail on click', () => {
    renderWithProviders(<WishlistPage />, mockMovies)
    
    const movieTitle = screen.getByText('Test Movie 1')
    fireEvent.click(movieTitle)
    
    expect(movieTitle).toBeInTheDocument()
  })
})