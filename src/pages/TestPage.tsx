import { useState, useEffect } from 'react'
import type { Movie } from '../types'
import { MovieCategory } from '../types'
import { getMoviesByCategory } from '../api/movieApi'
import { MovieCarousel } from '../components/MovieCarousel/MovieCarousel'

export function TestPage() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function loadPopularMovies() {
      try {
        console.log('Testing API connection...')
        const popularMovies = await getMoviesByCategory(MovieCategory.POPULAR)
        console.log('Movies received:', popularMovies)
        setPopularMovies(popularMovies)
      } catch (err) {
        console.error('API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPopularMovies()
  }, [])

  const handleMovieClick = (movie: Movie) => {
    console.log('Movie clicked:', movie.title)
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Loading movies...</h1>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '20px' }}>
      <MovieCarousel
        title="Popular Movies"
        movies={popularMovies}
        category="popular"
        onMovieClick={handleMovieClick}
      />
    </div>
  )
}