import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { topLinks, womenNavItems, menNavItems, aboutNavItems, megaMenu } from '../../data/navData'
import { selectCartCount, selectUser } from '../../store'
import SearchPanel from './SearchPanel'
import CartDrawer from './CartDrawer'
import './Navbar.css'

const aboutSection = ['/about', '/stores']

export default function Navbar() {
  const [activeNav,    setActiveNav]    = useState(null)
  const [searchOpen,   setSearchOpen]   = useState(false)
  const [cartOpen,     setCartOpen]     = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const searchInputRef = useRef(null)
  const userMenuRef    = useRef(null)
  const navigate       = useNavigate()
  const location       = useLocation()
  const cartCount      = useSelector(selectCartCount)
  const user           = useSelector(selectUser)

  const path             = location.pathname
  const inAboutSection   = aboutSection.includes(path)
  const inStoriesSection = path.startsWith('/stories')
  const inWomen          = path === '/women' || path.startsWith('/product/w-')
  const inMen            = path === '/men'   || (path.startsWith('/product/') && !path.startsWith('/product/w-'))
  const inShop           = inWomen || inMen || path === '/'

  const subNavItems = inWomen ? womenNavItems : menNavItems

  // focus search input when panel opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus()
  }, [searchOpen])

  // Escape closes search, cart, and user menu
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setCartOpen(false)
        setUserMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // close everything on route change
  useEffect(() => {
    setSearchOpen(false)
    setUserMenuOpen(false)
  }, [path])

  // close user menu when clicking outside of it
  useEffect(() => {
    if (!userMenuOpen) return
    const handler = e => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [userMenuOpen])

  // lock body scroll when cart drawer is open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen])

  function isTopLinkActive(link) {
    if (link.href === '/women')   return inWomen
    if (link.href === '/men')     return inMen
    if (link.href === '/about')   return inAboutSection
    if (link.href === '/stories') return inStoriesSection
    return link.href === path
  }

  async function handleSignOut() {
    setUserMenuOpen(false)
    await signOut(auth)
    navigate('/')
  }

  return (
    <>
      <header className="navbar">

        {/* ── promo bar ── */}
        <div className="navbar__promo">
          <span>Get early access on launches and offers.</span>
          <a href="#">Sign Up For Texts →</a>
          <div className="navbar__currency">
            <span className="navbar__flag">🇺🇸</span> USD
          </div>
        </div>

        {/* ── main row ── */}
        <div className="navbar__main">
          <nav className="navbar__top-links">
            {topLinks.map(link => {
              const active = isTopLinkActive(link)
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`navbar__top-link ${active ? 'navbar__top-link--active' : ''}`}
                >
                  {link.label}
                  {active && <span className="navbar__top-link-underline" />}
                </Link>
              )
            })}
          </nav>

          <Link to="/" className="navbar__logo">EVERLANE</Link>

          <div className="navbar__icons">
            {/* search */}
            <button
              aria-label="Search"
              className={searchOpen ? 'navbar__icon-btn--active' : ''}
              onClick={() => setSearchOpen(v => !v)}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="11" cy="11" r="7.5" /><path d="m21 21-4.5-4.5" />
              </svg>
            </button>

            {/* account — shows dropdown if signed in, links to login if not */}
            <div className="navbar__account-wrap" ref={userMenuRef}>
              {user ? (
                <button
                  aria-label="Account menu"
                  className={`navbar__account-btn ${userMenuOpen ? 'navbar__icon-btn--active' : ''}`}
                  onClick={() => setUserMenuOpen(v => !v)}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </button>
              ) : (
                <Link to="/login" aria-label="Sign in" className="navbar__account-btn">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </Link>
              )}

              {/* user dropdown menu */}
              {userMenuOpen && user && (
                <div className="navbar__user-menu">
                  <div className="navbar__user-menu-header">
                    <p className="navbar__user-name">
                      {user.displayName || 'My Account'}
                    </p>
                    <p className="navbar__user-email">{user.email}</p>
                  </div>
                  <div className="navbar__user-menu-links">
                    <Link to="/account" className="navbar__user-menu-link" onClick={() => setUserMenuOpen(false)}>
                      My Orders
                    </Link>
                    <Link to="/account" className="navbar__user-menu-link" onClick={() => setUserMenuOpen(false)}>
                      Account Settings
                    </Link>
                  </div>
                  <button className="navbar__user-signout" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* cart */}
            <button
              aria-label="Cart"
              className="navbar__cart-btn"
              onClick={() => setCartOpen(true)}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="navbar__cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* ── sub-nav ── */}
        {inAboutSection ? (
          <nav className="navbar__sub navbar__sub--about">
            {aboutNavItems.map(item => (
              <Link
                key={item.label}
                to={item.href}
                className={`navbar__sub-link ${path === item.href ? 'navbar__sub-link--active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (inShop && !inStoriesSection) ? (
          <nav className="navbar__sub" onMouseLeave={() => setActiveNav(null)}>
            {subNavItems.map(item => (
              <div
                key={item.label}
                className="navbar__sub-item-wrap"
                onMouseEnter={() => setActiveNav(item.hasMega ? item.label : null)}
              >
                <a
                  href={item.href}
                  className={[
                    'navbar__sub-link',
                    item.isSale ? 'navbar__sub-link--sale' : '',
                    activeNav === item.label ? 'navbar__sub-link--active' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {item.label}
                </a>

                {item.hasMega && activeNav === item.label && (
                  <div className="mega-menu">
                    <div className="mega-menu__inner">
                      <div className="mega-menu__col">
                        <p className="mega-menu__heading">HIGHLIGHTS</p>
                        {megaMenu.highlights.map(h => (
                          <a key={h} href="#" className="mega-menu__link">{h}</a>
                        ))}
                      </div>
                      <div className="mega-menu__col">
                        <p className="mega-menu__heading">FEATURED SHOPS</p>
                        {megaMenu.featuredShops.map(s => (
                          <a key={s} href="#" className="mega-menu__link">{s}</a>
                        ))}
                      </div>
                      <div className="mega-menu__images">
                        {megaMenu.images.map(img => (
                          <div key={img.label} className="mega-menu__img-card">
                            <img src={img.src} alt={img.label} />
                            <div className="mega-menu__img-label">
                              <span>{img.label}</span>
                              <span className="mega-menu__arrow">→</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        ) : null}

        {/* ── search panel ── */}
        {searchOpen && (
          <SearchPanel inputRef={searchInputRef} onCancel={() => setSearchOpen(false)} />
        )}
      </header>

      {/* cart drawer rendered outside header so it covers the page */}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  )
}
