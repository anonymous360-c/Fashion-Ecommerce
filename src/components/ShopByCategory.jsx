import { categories } from '../data/navData.js'
import styles from './ShopByCategory.module.css'

export default function ShopByCategory() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by Category</h2>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <a href={`/${cat.label.toLowerCase()}`} key={cat.label} className={styles.card}>
            <div className={styles.imgWrap}>
              <img src={cat.image} alt={cat.label} className={styles.img} />
            </div>
            <p className={styles.label}>{cat.label}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
