/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Header } from './Header'
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

describe('Header', () => {
  it('renders the logo and navigation', () => {
    renderWithProviders(<Header />)
    
    expect(screen.getByText('MovieBrowser')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Wishlist')).toBeInTheDocument()
  })

  it('shows wishlist without count when empty', () => {
    renderWithProviders(<Header />)
    
    expect(screen.getByText('Wishlist')).toBeInTheDocument()
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('shows correct wishlist count with movies', () => {
    renderWithProviders(<Header />, mockMovies)
    
    expect(screen.getByText('Wishlist')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('shows singular count for one movie', () => {
    renderWithProviders(<Header />, [mockMovies[0]])
    
    expect(screen.getByText('Wishlist')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    renderWithProviders(<Header />)
    
    const homeLink = screen.getByRole('link', { name: 'Home' })
    const wishlistLink = screen.getByRole('link', { name: /Wishlist/ })
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(wishlistLink).toHaveAttribute('href', '/wishlist')
  })

  it('applies correct CSS classes', () => {
    renderWithProviders(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('header')
  })
})