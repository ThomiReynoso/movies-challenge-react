
import { useRef } from 'react'
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
    const scrollRef = useRef<HTMLDivElement>(null)
  
    const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const scrollAmount = 400
        const currentScroll = scrollRef.current.scrollLeft
        const targetScroll = direction === 'left' 
          ? currentScroll - scrollAmount 
          : currentScroll + scrollAmount
        
        scrollRef.current.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        })
      }
    }
  
    return (
      <section className={`movie-carousel movie-carousel--${category}`}>
        <h2 className="movie-carousel__title">{title}</h2>
        
        <div className="movie-carousel__container">
          <button 
            className="movie-carousel__nav movie-carousel__nav--left"
            onClick={() => scroll('left')}
          >
            ‹
          </button>
          
          <div 
            className="movie-carousel__scroll"
            ref={scrollRef}
          >
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => onMovieClick(movie)}
              />
            ))}
          </div>
          
          <button 
            className="movie-carousel__nav movie-carousel__nav--right"
            onClick={() => scroll('right')}
          >
            ›
          </button>
        </div>
      </section>
    )
  }