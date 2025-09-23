/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { MovieDetailPage } from './MovieDetailPage'
import wishlistReducer from '../../store/wishlistSlice'

// Mock the API module
vi.mock('../../api/movieApi', () => ({
  getMovieDetails: vi.fn(),
  getImageUrl: vi.fn((path) => path || '/no-image.jpg')
}))

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  runtime: 120,
  genres: [{ id: 1, name: 'Action' }],
  backdrop_path: '/backdrop.jpg',
  tagline: 'Test tagline',
  production_companies: [{ name: 'Test Studio' }],
  spoken_languages: [{ name: 'English' }]
}

const createMockStore = (initialState = { wishlist: { movies: [] } }) => {
  return configureStore({
    reducer: {
      wishlist: wishlistReducer
    },
    preloadedState: initialState
  })
}

const renderWithProviders = (component: React.ReactElement, { route = '/movie/1' } = {}) => {
  const store = createMockStore()
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {component}
      </MemoryRouter>
    </Provider>
  )
}

describe('MovieDetailPage', () => {
  beforeEach(async () => {
    vi.resetAllMocks()

    const { getMovieDetails } = await import('../../api/movieApi')
    // Mock successful API response
    vi.mocked(getMovieDetails).mockResolvedValue(mockMovie)
  })

  it('renders component without crashing', () => {
    renderWithProviders(<MovieDetailPage />)
    expect(screen.getByText('Loading movie details...')).toBeInTheDocument()
  })

  it('displays loading spinner', () => {
    const { container } = render(
      <Provider store={createMockStore()}>
        <MemoryRouter initialEntries={['/movie/1']}>
          <MovieDetailPage />
        </MemoryRouter>
      </Provider>
    )
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument()
  })
})