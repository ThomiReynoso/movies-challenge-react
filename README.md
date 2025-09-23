# Movie Browser App

A React application for exploring movies using The Movie Database (TMDB) API.

## Local Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn


### 1. Install dependencies
```bash
npm install
```

### 2. Configure API Key
1. Go to [TMDB](https://www.themoviedb.org/settings/api) and create an account
2. Get your free API key
3. Copy the example file:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` and replace `your_api_key_here` with your real API key:
   ```
   VITE_TMDB_API_KEY=your_actual_api_key
   ```

### 3. Run in development
```bash
npm run dev          # Client (Vite)
npm run dev:ssr      # Server Side Rendering
```

### 4. Testing
```bash
npm test             # Run tests
npm run test:coverage # Tests with coverage
```

### 5. Production build
```bash
npm run build        # Complete build
npm run serve        # Serve production build
```

## Architecture

- **Frontend**: React 19 + TypeScript + Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: SCSS with centralized variables
- **SSR**: Express server
- **Testing**: Vitest + React Testing Library

## Features

- Browse movies by categories (Popular, Top Rated, Upcoming)
- View movie details
- Add/remove movies from wishlist
- Server-Side Rendering (SSR)
- Automated testing
- Responsive design

## Project Structure

```
src/
├── api/           # API calls
├── components/    # Reusable components
├── pages/         # Main pages/routes
├── store/         # Redux store and slices
├── styles/        # Global SCSS variables
├── types/         # TypeScript definitions
└── test/          # Testing configuration
```

## 🔐 Security

- API keys are handled via environment variables
- `.env` file is in `.gitignore`
- Use `.env.example` as template for new developers


## Testing

Current coverage: ~38% - See details with `npm run test:coverage`

Covered areas:
- Redux store (100%)
- Header component (100%)  
- WishlistPage (95%+)
- MovieDetailPage (47%)


## Developer Notes

- This app uses a public development TMDB API key
- Tests use API mocks, don't require real API key
- SSR is configured for both development and production