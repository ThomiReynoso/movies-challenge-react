
import type {  Movie, MovieCategoryType as Category } from '../../types'
import { MovieCard } from '../MovieCard/MovieCard'
import './MovieCarousel.scss'

interface MovieCarouselProps {
  title: string
  movies: Movie[]
  category: Category
  onMovieClick: (movie: Movie) => void
}

export function MovieCarousel({ title, movies, category, onMovieClick }: MovieCarouselProps) {
  return (
    <section className={`movie-carousel movie-carousel--${category}`}>
      <h2 className="movie-carousel__title">{title}</h2>
      
      <div className="movie-carousel__container">
        <div className="movie-carousel__scroll">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onMovieClick(movie)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}