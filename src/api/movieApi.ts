import type { Movie, MovieDetails, MovieCategoryType } from '../types/index'
import { MovieCategory } from '../types/index'

const API_KEY = 'b66cb063a2a90c7626312034cd9d42b2'
const BASE_URL = 'https://api.themoviedb.org/3'

async function fetchFromAPI(endpoint: string) {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  
  return response.json()
}

export async function getMoviesByCategory(category: MovieCategoryType): Promise<Movie[]> {
  const endpoints = {
    [MovieCategory.POPULAR]: '/movie/popular',
    [MovieCategory.TOP_RATED]: '/movie/top_rated', 
    [MovieCategory.UPCOMING]: '/movie/upcoming'
  }
  
  const data = await fetchFromAPI(endpoints[category])
  return data.results.slice(0, 10)
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return await fetchFromAPI(`/movie/${id}`)
}

export function getImageUrl(path: string | null): string {
    if (!path) return '/no-image.jpg'
    return `https://image.tmdb.org/t/p/w500${path}`
  }