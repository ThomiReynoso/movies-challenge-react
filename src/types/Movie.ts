export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
  production_companies?: Array<{
    name: string
  }>
  spoken_languages?: Array<{
    english_name: string
  }>
}