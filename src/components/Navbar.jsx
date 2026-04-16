import { useState } from 'react'
import TopBanner from './TopBanner.jsx'
import MegaMenu from './MegaMenu.jsx'
import { navLinks, subNavLinks } from '../data/navData.js'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [activeNav, setActiveNav] = useState(null)

  return (
    <header className={styles.header}>
      <TopBanner />

      <div className={styles.mainNav}>
        <nav className={styles.leftLinks}>
          {navLinks.map((link) => (
            <div
              key={link.label}
              className={styles.navItemWrap}
              onMouseEnter={() => setActiveNav(link.label)}
              onMouseLeave={() => setActiveNav(null)}
            >
              <a
                href={link.href}
                className={`${styles.navLink} ${activeNav === link.label ? styles.navLinkActive : ''}`}
              >
                {link.label}
              </a>
              {activeNav === link.label && link.label === 'Men' && (
                <div className={styles.activeLine} />
              )}
            </div>
          ))}
        </nav>

        <a href="/" className={styles.logo}>
          FASHIONCO
        </a>

        <div className={styles.rightIcons}>
          <button className={styles.iconBtn} aria-label="Search">
            <SearchIcon />
          </button>
          <button className={styles.iconBtn} aria-label="Account">
            <AccountIcon />
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            <CartIcon />
          </button>
        </div>
      </div>

      <div
        className={styles.subNavWrap}
        onMouseEnter={() => setActiveNav('subnav')}
        onMouseLeave={() => setActiveNav(null)}
      >
        <nav className={styles.subNav}>
          {subNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${styles.subLink} ${link.highlight ? styles.subLinkSale : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {activeNav === 'subnav' && <MegaMenu isOpen={true} />}
      </div>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
