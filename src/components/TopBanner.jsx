import styles from './TopBanner.module.css'

export default function TopBanner() {
  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        Get early access on launches and offers.{' '}
        <a href="/signup" className={styles.link}>
          Sign Up For Texts →
        </a>
      </p>
      <div className={styles.currency}>
        <img
          src="https://flagcdn.com/w20/us.png"
          alt="US Flag"
          className={styles.flag}
        />
        <span>USD</span>
      </div>
    </div>
  )
}
