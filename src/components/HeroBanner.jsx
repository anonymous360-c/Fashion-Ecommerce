import styles from './HeroBanner.module.css'

export default function HeroBanner() {
  return (
    <section className={styles.hero}>
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=85"
        alt="Your Cozy Era"
        className={styles.heroImg}
      />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Your Cozy Era</h1>
        <p className={styles.heroSub}>Start warm with our new winter essentials.</p>
        <a href="/shop" className={styles.heroBtn}>Shop It In</a>
      </div>
    </section>
  )
}
