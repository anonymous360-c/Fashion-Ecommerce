import { categories } from '../../data/homeData'
import './ShopByCategory.css'

export default function ShopByCategory() {
  return (
    <section className="category">
      <h2 className="section-title">Shop by Category</h2>
      <div className="category__grid">
        {categories.map(cat => (
          <a key={cat.label} href="#" className="category__item">
            <div className="category__img-wrap">
              <img src={cat.image} alt={cat.label} />
            </div>
            <p className="category__label">{cat.label}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
