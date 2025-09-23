
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import './App.scss'
import { HomePage } from './pages/HomePage/HomePage'
import { MovieDetailPage } from './pages/MovieDetailPage/MovieDetailPage'
import { WishlistPage } from './pages/WishlistPage/WishlistPage'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/movie/:id" element={<MovieDetailPage/>}/>
          <Route path="/wishlist" element={<WishlistPage/>}/>
        </Routes>
      </main>
    </div>
  )
}
export default App