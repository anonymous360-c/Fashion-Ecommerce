import { editorialImages } from '../../data/homeData'
import './EditorialGrid.css'

export default function EditorialGrid() {
  return (
    <section className="editorial">
      <div className="editorial__grid">
        {editorialImages.map((src, i) => (
          <div key={i} className={`editorial__item editorial__item--${i}`}>
            <img src={src} alt={`editorial ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="editorial__cta-wrap">
        <a href="#" className="editorial__cta">View More</a>
      </div>
    </section>
  )
}
