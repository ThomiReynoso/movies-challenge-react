
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import './App.scss'
import { HomePage } from './pages/HomePage/HomePage'

function App() {
  return (
      <Router>
        <div className="app">
          <Header />
          <main className="app__main">
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/movie/:id" />
              <Route path="/wishlist"/>
            </Routes>
          </main>
        </div>
      </Router>
  )
}
export default App