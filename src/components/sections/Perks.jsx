import { perks } from '../../data/homeData'
import './Perks.css'

export default function Perks() {
  return (
    <section className="perks">
      {perks.map(perk => (
        <div key={perk.title} className="perks__item">
          <span className="perks__icon">{perk.icon}</span>
          <p className="perks__title">{perk.title}</p>
          <p className="perks__desc">{perk.desc}</p>
        </div>
      ))}
    </section>
  )
}
