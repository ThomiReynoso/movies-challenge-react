import { Link } from 'react-router-dom'
import './Header.scss'

export function Header() {

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          MovieBrowser
        </Link>
        
        <nav className="header__nav">
          <Link to="/" className="header__link">
            Home
          </Link>
          <Link to="/wishlist" className="header__link">
           
          </Link>
        </nav>
      </div>
    </header>
  )
}