import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { selectWishlistCount } from '../../store/selectors'
import './Header.scss'

export function Header() {
  const wishlistCount = useAppSelector(selectWishlistCount)

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
          <Link to="/wishlist" className="header__link header__link--wishlist">
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="header__wishlist-count">{wishlistCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}