export interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string | null
    release_date: string
    vote_average: number
}

export interface MovieDetails extends Movie {
    runtime: number
    genres: { id: number; name: string }[]
}

export const MovieCategory = {
    POPULAR: 'popular',
    TOP_RATED: 'top_rated',
    UPCOMING: 'upcoming'
} as const

export type MovieCategoryType = typeof MovieCategory[keyof typeof MovieCategory]

