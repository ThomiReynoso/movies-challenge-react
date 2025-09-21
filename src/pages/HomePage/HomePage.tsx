import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.scss'

import { getMoviesByCategory } from '../../api/movieApi'
import { MovieCarousel } from '../../components/MovieCarousel/MovieCarousel'
import { MovieCategory, type Movie, type MovieCategoryType } from '../../types'

export function HomePage() {
  const navigate = useNavigate()
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMovies() {
      try {
        const [popular, topRated, upcoming] = await Promise.all([
          getMoviesByCategory(MovieCategory.POPULAR),
          getMoviesByCategory(MovieCategory.TOP_RATED),
          getMoviesByCategory(MovieCategory.UPCOMING)
        ])
        
        setPopularMovies(popular)
        setTopRatedMovies(topRated)
        setUpcomingMovies(upcoming)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  const handleMovieClick = (movie: Movie, category: MovieCategoryType) => {
    navigate(`/movie/${movie.id}`, { state: { category } })
  }

  if (loading) {
    return (
      <div className="home-page__loading">
        <div className="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="home-page__error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1>Discover Movies</h1>
        <p>Browse through popular, top-rated, and upcoming films</p>
      </header>

      <MovieCarousel
        title="Popular Movies"
        movies={popularMovies}
        category={MovieCategory.POPULAR}
        onMovieClick={(movie) => handleMovieClick(movie, MovieCategory.POPULAR)}
      />
      
      <MovieCarousel
        title="Top Rated Movies"
        movies={topRatedMovies}
        category={MovieCategory.TOP_RATED}
        onMovieClick={(movie) => handleMovieClick(movie, MovieCategory.TOP_RATED)}
      />
      
      <MovieCarousel
        title="Upcoming Movies"
        movies={upcomingMovies}
        category={MovieCategory.UPCOMING}
        onMovieClick={(movie) => handleMovieClick(movie, MovieCategory.UPCOMING)}
      />
    </div>
  )
}