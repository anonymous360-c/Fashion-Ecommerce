import { testimonialsData } from '../../data/homeData'
import './Testimonial.css'

export default function Testimonial() {
  const { rating, quote, author, product, productImage } = testimonialsData

  return (
    <section className="testimonial">
      <div className="testimonial__left">
        <p className="testimonial__tag">People Are Talking</p>
        <div className="testimonial__stars">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className="testimonial__star">★</span>
          ))}
        </div>
        <blockquote className="testimonial__quote">{quote}</blockquote>
        <p className="testimonial__author">— {author}</p>
        <a href="#" className="testimonial__product-link">{product} →</a>
      </div>
      <div className="testimonial__right">
        <img src={productImage} alt={product} />
      </div>
    </section>
  )
}
