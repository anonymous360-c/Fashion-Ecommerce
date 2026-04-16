import { storesFooterLinks } from '../../data/storesData'
import './StoresFooter.css'

export default function StoresFooter() {
  return (
    <footer className="stores-footer">
      <div className="stores-footer__top">
        <div className="stores-footer__cols">
          {Object.entries(storesFooterLinks).map(([group, links]) => (
            <div key={group} className="stores-footer__col">
              <p className="stores-footer__group">{group}</p>
              {links.map(link => (
                <a key={link} href="#" className="stores-footer__link">{link}</a>
              ))}
            </div>
          ))}
        </div>

        {/* email signup — right side */}
        <div className="stores-footer__email-col">
          <div className="stores-footer__email-row">
            <input
              type="email"
              placeholder="Email Address"
              className="stores-footer__input"
            />
            <button className="stores-footer__submit" aria-label="Subscribe">→</button>
          </div>
        </div>
      </div>

      {/* legal bar */}
      <div className="stores-footer__legal">
        <div className="stores-footer__legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Do Not Sell or Share My Personal Information</a>
          <a href="#">CS Supply Chain Transparency</a>
          <a href="#">Vendor Code of Conduct</a>
          <a href="#">Sitemap Pages</a>
          <a href="#">Sitemap Products</a>
        </div>
        <p className="stores-footer__copy">© 2023 All Rights Reserved</p>
      </div>
    </footer>
  )
}
