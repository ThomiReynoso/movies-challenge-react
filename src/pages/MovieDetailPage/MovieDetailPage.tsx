import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getMovieDetails, getImageUrl } from '../../api/movieApi'
import { type MovieDetails, type MovieCategoryType, MovieCategory } from '../../types'
import './MovieDetailPage.scss'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const category = location.state?.category as MovieCategoryType || MovieCategory.POPULAR

  useEffect(() => {
    async function loadMovieDetails() {
      if (!id) return
      
      try {
        setLoading(true)
        const movieData = await getMovieDetails(Number(id))
        setMovie(movieData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movie details')
      } finally {
        setLoading(false)
      }
    }

    loadMovieDetails()
  }, [id])

  const handleGoBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="movie-detail__loading">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="movie-detail__error">
        <h2>Oops! Something went wrong</h2>
        <p>{error || 'Movie not found'}</p>
        <button onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    )
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatYear = (dateString: string) => {
    return new Date(dateString).getFullYear()
  }

  return (
    <div className={`movie-detail movie-detail--${category}`}>
      <div className="movie-detail__backdrop">
        <img 
          src={getImageUrl(movie.backdrop_path, 'w1280')} 
          alt={`${movie.title} backdrop`}
          className="movie-detail__backdrop-image"
        />
        <div className="movie-detail__backdrop-overlay"></div>
      </div>

      <div className="movie-detail__content">
        <button 
          className="movie-detail__back-button"
          onClick={handleGoBack}
        >
          ← Back
        </button>

        <div className="movie-detail__main">
          <div className="movie-detail__poster">
            <img 
              src={getImageUrl(movie.poster_path)} 
              alt={movie.title}
              className="movie-detail__poster-image"
            />
          </div>

          <div className="movie-detail__info">
            <h1 className="movie-detail__title">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="movie-detail__tagline">"{movie.tagline}"</p>
            )}

            <div className="movie-detail__meta">
              <span className="movie-detail__year">{formatYear(movie.release_date)}</span>
              <span className="movie-detail__runtime">{formatRuntime(movie.runtime)}</span>
              <span className="movie-detail__rating">⭐ {movie.vote_average.toFixed(1)}</span>
            </div>

            <div className="movie-detail__genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="movie-detail__genre">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="movie-detail__sections">
          <div className="movie-detail__overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>

          {movie.production_companies.length > 0 && (
            <div className="movie-detail__production">
              <h3>Production</h3>
              <p>{movie.production_companies.map(company => company.name).join(', ')}</p>
            </div>
          )}

          {movie.spoken_languages.length > 0 && (
            <div className="movie-detail__languages">
              <h3>Languages</h3>
              <p>{movie.spoken_languages.map(lang => lang.name).join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}