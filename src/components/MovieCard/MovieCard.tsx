
import type { Movie } from '../../types'
import { getImageUrl } from '../../api/movieApi'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { selectIsMovieInWishlist } from '../../store/selectors'
import { toggleWishlist } from '../../store/wishlistSlice'
import './MovieCard.scss'

interface MovieCardProps {
  movie: Movie
  onClick: () => void
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const dispatch = useAppDispatch()
  const isInWishlist = useAppSelector(state => selectIsMovieInWishlist(state, movie.id))

  const handleWishlistClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(toggleWishlist(movie))
  }

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-card__image-container">
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title}
          className="movie-card__image"
        />
        <button
          className={`movie-card__wishlist-button ${isInWishlist ? 'movie-card__wishlist-button--active' : ''}`}
          onClick={handleWishlistClick}
          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>
      </div>
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