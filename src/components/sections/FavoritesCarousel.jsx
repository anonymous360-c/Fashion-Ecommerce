import { useState } from 'react'
import { favorites } from '../../data/homeData'
import './FavoritesCarousel.css'

export default function FavoritesCarousel() {
  const [idx, setIdx] = useState(0)
  const visible = 4

  const prev = () => setIdx(i => Math.max(0, i - 1))
  const next = () => setIdx(i => Math.min(favorites.length - visible, i + 1))

  return (
    <section className="favorites">
      <p className="favorites__subtitle">Beautifully Functional. Purposefully Designed. Consciously Crafted.</p>
      <h2 className="section-title">Everlane Favorites</h2>

      <div className="favorites__carousel-wrap">
        <button className="favorites__arrow favorites__arrow--left" onClick={prev} disabled={idx === 0}>
          ‹
        </button>

        <div className="favorites__track-clip">
          <div
            className="favorites__track"
            style={{ transform: `translateX(-${idx * (100 / visible)}%)` }}
          >
            {favorites.map(item => (
              <div key={item.name} className="favorites__card">
                <div className="favorites__card-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <p className="favorites__name">{item.name}</p>
                <p className="favorites__price">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="favorites__arrow favorites__arrow--right" onClick={next} disabled={idx >= favorites.length - visible}>
          ›
        </button>
      </div>

      <div className="favorites__dots">
        {Array.from({ length: favorites.length - visible + 1 }).map((_, i) => (
          <button
            key={i}
            className={`favorites__dot ${i === idx ? 'favorites__dot--active' : ''}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </section>
  )
}
