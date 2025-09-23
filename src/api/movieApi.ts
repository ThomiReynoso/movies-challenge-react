import type { Movie, MovieDetails, MovieCategoryType } from '../types/index'
import { MovieCategory } from '../types/index'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'

if (!API_KEY) {
  throw new Error('VITE_TMDB_API_KEY is required. Please check your .env file.')
}

async function fetchFromAPI(endpoint: string) {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  
  return response.json()
}

export async function getMoviesByCategory(category: MovieCategoryType, limit: number = 10): Promise<Movie[]> {
  const endpoints = {
    [MovieCategory.POPULAR]: '/movie/popular',
    [MovieCategory.TOP_RATED]: '/movie/top_rated', 
    [MovieCategory.UPCOMING]: '/movie/upcoming'
  }
  
  const data = await fetchFromAPI(endpoints[category])
  return data.results.slice(0, limit)
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return await fetchFromAPI(`/movie/${id}`)
}

export function getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) return '/no-image.jpg'
    return `https://image.tmdb.org/t/p/${size}${path}`
  }