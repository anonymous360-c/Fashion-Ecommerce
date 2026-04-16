import { footerLinks } from '../../data/homeData'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group} className="footer__col">
            <p className="footer__group">{group}</p>
            {links.map(link => (
              <a key={link} href="#" className="footer__link">{link}</a>
            ))}
          </div>
        ))}
        <div className="footer__col footer__col--newsletter">
          <p className="footer__group">Stay in the Loop</p>
          <p className="footer__newsletter-sub">Enter your email for updates on new arrivals and more.</p>
          <div className="footer__email-row">
            <input type="email" placeholder="Email address" className="footer__input" />
            <button className="footer__submit">→</button>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2024 Everlane. All rights reserved.</p>
      </div>
    </footer>
  )
}
