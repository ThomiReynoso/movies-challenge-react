import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/redux'
import { selectWishlistMovies } from '../../store/selectors'
import { removeFromWishlist, clearWishlist } from '../../store/wishlistSlice'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import type { Movie } from '../../types'
import './WishlistPage.scss'

export function WishlistPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const wishlistMovies = useAppSelector(selectWishlistMovies)

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`, { state: { category: 'wishlist' } })
  }

  const handleRemoveMovie = (movieId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(removeFromWishlist(movieId))
  }

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      dispatch(clearWishlist())
    }
  }

  if (wishlistMovies.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-page__empty">
          <h1>Your Wishlist</h1>
          <div className="wishlist-page__empty-content">
            <p>Your wishlist is empty</p>
            <p>Start adding movies you want to watch!</p>
            <button 
              className="wishlist-page__browse-button"
              onClick={() => navigate('/')}
            >
              Browse Movies
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-page__header">
        <h1>Your Wishlist</h1>
        <div className="wishlist-page__actions">
          <span className="wishlist-page__count">
            {wishlistMovies.length} movie{wishlistMovies.length !== 1 ? 's' : ''}
          </span>
          <button 
            className="wishlist-page__clear-button"
            onClick={handleClearWishlist}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="wishlist-page__grid">
        {wishlistMovies.map(movie => (
          <div key={movie.id} className="wishlist-page__movie-item">
            <MovieCard
              movie={movie}
              onClick={() => handleMovieClick(movie)}
            />
            <button
              className="wishlist-page__remove-button"
              onClick={(event) => handleRemoveMovie(movie.id, event)}
              title="Remove from wishlist"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}