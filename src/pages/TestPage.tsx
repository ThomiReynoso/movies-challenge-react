import { useState, useEffect } from 'react'
import type { Movie } from '../types'
import { MovieCategory } from '../types'
import { getMoviesByCategory } from '../api/movieApi'

export function TestPage() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    async function testAPI() {
      try {
        console.log('Testing API connection...')
        const popularMovies = await getMoviesByCategory(MovieCategory.POPULAR)
        console.log('Movies received:', popularMovies)
        setMovies(popularMovies)
      } catch (err) {
        console.error('API Error:', err)
      }
    }

    testAPI()
  }, [])

  return (
    <div style={{ padding: '40px' }}>
      <h1>✅ API Connection Successful!</h1>
      <p>Found {movies.length} movies</p>
      
    </div>
  )
}