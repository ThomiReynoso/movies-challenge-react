
import type { Movie } from '../../types'
import { getImageUrl } from '../../api/movieApi'
import './MovieCard.scss'

interface MovieCardProps {
  movie: Movie
  onClick: () => void
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img 
        src={getImageUrl(movie.poster_path)} 
        alt={movie.title}
        className="movie-card__image"
      />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">
          {new Date(movie.release_date).getFullYear()}
        </p>
        <div className="movie-card__rating">
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </div>
  )
}