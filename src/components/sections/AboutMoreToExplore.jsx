import { moreToExplore } from '../../data/aboutData'
import './AboutMoreToExplore.css'

export default function AboutMoreToExplore() {
  return (
    <section className="more-explore">
      <h2 className="more-explore__title">More to Explore</h2>
      <div className="more-explore__grid">
        {moreToExplore.map(item => (
          <a key={item.label} href="#" className="more-explore__card">
            <div className="more-explore__img-wrap">
              <img src={item.image} alt={item.label} />
            </div>
            <p className="more-explore__label">{item.label}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
