import { megaMenuData } from '../data/navData.js'
import styles from './MegaMenu.module.css'

export default function MegaMenu({ isOpen }) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.menu}>
        <div className={styles.column}>
          <p className={styles.columnTitle}>HIGHLIGHTS</p>
          <ul className={styles.linkList}>
            {megaMenuData.highlights.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={styles.menuLink}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <p className={styles.columnTitle}>FEATURED SHOPS</p>
          <ul className={styles.linkList}>
            {megaMenuData.featuredShops.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={styles.menuLink}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.featuredImages}>
          {megaMenuData.featured.map((item) => (
            <a href={item.href} key={item.label} className={styles.featuredCard}>
              <img src={item.image} alt={item.label} className={styles.featuredImg} />
              <div className={styles.featuredLabel}>
                <span>{item.label}</span>
                <span className={styles.arrow}>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
