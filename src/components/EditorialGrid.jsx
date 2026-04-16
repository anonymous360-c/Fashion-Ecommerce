import styles from './EditorialGrid.module.css'

const editorialItems = [
  {
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
    label: 'The Holiday Edit',
    href: '/holiday-edit',
  },
  {
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80',
    label: 'New Arrivals',
    href: '/new-arrivals',
    tall: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80',
    label: 'Winter Essentials',
    href: '/winter-essentials',
  },
]

export default function EditorialGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.colLeft}>
          <a href={editorialItems[0].href} className={styles.card}>
            <img src={editorialItems[0].image} alt={editorialItems[0].label} className={styles.img} />
          </a>
          <a href={editorialItems[2].href} className={styles.card}>
            <img src={editorialItems[2].image} alt={editorialItems[2].label} className={styles.img} />
          </a>
        </div>
        <div className={styles.colRight}>
          <a href={editorialItems[1].href} className={`${styles.card} ${styles.cardTall}`}>
            <img src={editorialItems[1].image} alt={editorialItems[1].label} className={styles.img} />
          </a>
        </div>
      </div>
      <div className={styles.shopRow}>
        <a href="/men" className={styles.shopLink}>↩ SHOP SCENE</a>
      </div>
    </section>
  )
}
