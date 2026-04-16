import { giftPicksData } from '../../data/homeData'
import './GiftPicks.css'

export default function GiftPicks() {
  return (
    <section className="gift-picks">
      {giftPicksData.map(item => (
        <div key={item.label} className="gift-picks__item">
          <div className="gift-picks__img-wrap">
            <img src={item.image} alt={item.label} />
          </div>
          <h3 className="gift-picks__label">{item.label}</h3>
          <p className="gift-picks__desc">{item.description}</p>
          <a href="#" className="gift-picks__cta">{item.cta}</a>
        </div>
      ))}
    </section>
  )
}
