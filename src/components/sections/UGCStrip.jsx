import { useState } from 'react'
import { ugcImages } from '../../data/homeData'
import './UGCStrip.css'

export default function UGCStrip() {
  const [idx, setIdx] = useState(0)
  const visible = 4

  const prev = () => setIdx(i => Math.max(0, i - 1))
  const next = () => setIdx(i => Math.min(ugcImages.length - visible, i + 1))

  return (
    <section className="ugc">
      <h2 className="section-title">Everlane On You</h2>
      <p className="ugc__subtitle">
        Share your style on <a href="#">@everlane</a> for a chance to be featured.
        <a href="#"> Follow Tags</a>
      </p>

      <div className="ugc__carousel-wrap">
        <button className="ugc__arrow" onClick={prev} disabled={idx === 0}>‹</button>
        <div className="ugc__track-clip">
          <div
            className="ugc__track"
            style={{ transform: `translateX(-${idx * (100 / visible)}%)` }}
          >
            {ugcImages.map((src, i) => (
              <div key={i} className="ugc__item">
                <img src={src} alt={`customer look ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <button className="ugc__arrow" onClick={next} disabled={idx >= ugcImages.length - visible}>›</button>
      </div>
    </section>
  )
}
