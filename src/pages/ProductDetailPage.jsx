import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Navbar from '../components/layout/Navbar'
import StoresFooter from '../components/layout/StoresFooter'
import { products, womenProducts } from '../data/productsData'
import { addToCart } from '../store'
import './ProductDetailPage.css'

const reviews = [
  {
    name: 'ElizabethRBklyn',
    verified: true,
    rating: 5,
    title: 'Warm and very attractive on',
    body: 'Got this to keep my husband warm on those chilly late fall days. He loves it — not only is it pretty warm but he looks good in it and he knows it.',
    height: "5'9\"", weight: '180 lbs', bodyType: 'Petite',
    sizePurchased: 'L', usualSize: 'L',
    date: '16 days ago',
  },
  {
    name: 'Anonymous',
    verified: true,
    rating: 5,
    title: 'Super comfy',
    body: 'Great quality, warm and super comfy. Got the XL because I have a large back and it fits perfectly. It does run a bit oversized which is good.',
    height: "5'3\"", weight: '160 lbs', bodyType: 'Petite',
    sizePurchased: 'XL', usualSize: 'L',
    date: '16 days ago',
  },
]

const transparentPricing = [
  { label: 'Materials',  value: '$47.90', icon: '🧵' },
  { label: 'Hardware',   value: '$6.74',  icon: '🔩' },
  { label: 'Labor',      value: '$13.75', icon: '✂️' },
  { label: 'Duties',     value: '$8.05',  icon: '💵' },
  { label: 'Transport',  value: '$1.52',  icon: '🚢' },
]

function StarRow({ count }) {
  return (
    <div className="pdp-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'pdp-star pdp-star--filled' : 'pdp-star'}>★</span>
      ))}
    </div>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const allProducts = [...products, ...womenProducts]
  const product = allProducts.find(p => p.id === id) || allProducts[0]
  const related = allProducts
    .filter(p => p.id !== product.id && p.gender === product.gender)
    .slice(0, 4)

  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [selectedSize,     setSelectedSize]     = useState(null)
  const [activeImg,        setActiveImg]        = useState(0)
  const [addedMsg,         setAddedMsg]         = useState(false)

  // build the detail image grid purely from the product's own images
  // repeat them to fill the 2×3 grid rather than using hardcoded fallbacks
  const detailImages = Array.from({ length: 6 }, (_, i) => product.images[i % product.images.length])

  const sizes = product.gender === 'women'
    ? ['XXS', 'XS', 'S', 'M', 'L', 'XL']
    : ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  function handleAddToCart() {
    if (!selectedSize) {
      alert('Please select a size.')
      return
    }
    dispatch(addToCart({
      id:    product.id,
      name:  product.name,
      price: product.price,
      color: product.color,
      size:  selectedSize,
      image: product.images[0],
    }))
    setAddedMsg(true)
    setTimeout(() => setAddedMsg(false), 2500)
  }

  return (
    <>
      <Navbar />

      <div className="pdp">
        <div className="pdp__top">

          {/* image grid — 2 columns, images come from the product */}
          <div className="pdp__images">
            <div className="pdp__images-grid">
              {detailImages.map((src, i) => (
                <div
                  key={i}
                  className={`pdp__img-cell ${activeImg === i ? 'pdp__img-cell--active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={src} alt={`${product.name} view ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* info panel */}
          <div className="pdp__info">
            <p className="pdp__breadcrumb">
              <Link to={product.gender === 'women' ? '/women' : '/men'}>
                {product.gender === 'women' ? 'Women' : 'Men'}
              </Link>
              {' / '}{product.category}
            </p>

            <h1 className="pdp__title">{product.name}</h1>

            <div className="pdp__rating-row">
              <StarRow count={5} />
              <a href="#reviews" className="pdp__review-count">5.0 (2 Reviews)</a>
            </div>

            <div className="pdp__pricing">
              <span className="pdp__original">${product.originalPrice}</span>
              <span className="pdp__price">${product.price}</span>
            </div>

            {/* color */}
            <div className="pdp__option-block">
              <p className="pdp__option-label">
                Color <strong>{product.color}</strong>
              </p>
              <div className="pdp__color-swatches">
                {product.colorSwatches.map((hex, i) => (
                  <button
                    key={i}
                    className={`pdp__color-swatch ${selectedColorIdx === i ? 'pdp__color-swatch--active' : ''}`}
                    style={{ background: hex }}
                    onClick={() => setSelectedColorIdx(i)}
                    aria-label={`Color ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* size */}
            <div className="pdp__option-block">
              <div className="pdp__size-header">
                <p className="pdp__option-label">Size</p>
                <a href="#" className="pdp__size-guide">Size Guide</a>
              </div>
              <div className="pdp__sizes">
                {sizes.map(s => (
                  <button
                    key={s}
                    className={`pdp__size-btn ${selectedSize === s ? 'pdp__size-btn--active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* add to bag */}
            <button
              className={`pdp__add-btn ${addedMsg ? 'pdp__add-btn--added' : ''}`}
              onClick={handleAddToCart}
            >
              {addedMsg ? '✓ Added to Bag' : 'ADD TO BAG'}
            </button>

            {/* perks */}
            <div className="pdp__perks">
              <div className="pdp__perk">
                <span className="pdp__perk-icon">🚚</span>
                <div>
                  <p className="pdp__perk-title">Free Shipping</p>
                  <p className="pdp__perk-sub">Free on orders over $100. <a href="#">Learn more.</a></p>
                </div>
              </div>
              <div className="pdp__perk">
                <span className="pdp__perk-icon">↩</span>
                <div>
                  <p className="pdp__perk-title">Easy Returns</p>
                  <p className="pdp__perk-sub">Extended returns through January 31. <a href="#">Details.</a></p>
                </div>
              </div>
              <div className="pdp__perk">
                <span className="pdp__perk-icon">🎁</span>
                <div>
                  <p className="pdp__perk-title">Send It As A Gift</p>
                  <p className="pdp__perk-sub">Add a free personalized note during checkout.</p>
                </div>
              </div>
            </div>

            <p className="pdp__desc">
              <strong>Part shirt, part jacket, all style.</strong>
              <br /><br />
              Made with the finest materials, this piece blends quality craftsmanship with timeless design. Whether you're dressing up or keeping it casual, it works for every occasion and only gets better with time.
            </p>

            <div className="pdp__model">
              <span className="pdp__model-label">Model</span>
              <span className="pdp__model-value">
                {product.gender === 'women' ? "Model is 5'9\", wearing a size S" : "Model is 6'2\", wearing a size M"}
              </span>
            </div>

            <div className="pdp__fit">
              <p className="pdp__fit-label">Fit</p>
              <div className="pdp__fit-links">
                <a href="#">Questions about fit?</a>
                <a href="#">Contact Us</a>
                <a href="#">Size Guide</a>
              </div>
            </div>

            {product.tags.length > 0 && (
              <div className="pdp__sustainability">
                <p className="pdp__sustainability-label">Sustainability</p>
                <div className="pdp__sustainability-badges">
                  {product.tags.map(tag => (
                    <span key={tag} className="pdp__sus-badge">⌂ {tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* recommended */}
        <section className="pdp__recommended">
          <h2 className="pdp__section-title">Recommended Products</h2>
          <div className="pdp__recommended-grid">
            {related.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="pdp__rec-card">
                <div className="pdp__rec-img-wrap">
                  <img src={p.images[0]} alt={p.name} />
                </div>
                <div className="pdp__rec-info">
                  <p className="pdp__rec-name">{p.name}</p>
                  <p className="pdp__rec-pricing">
                    <span className="pdp__rec-original">${p.originalPrice}</span>
                    <span className="pdp__rec-price">${p.price}</span>
                  </p>
                  <p className="pdp__rec-color">{p.color}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* reviews */}
        <section className="pdp__reviews" id="reviews">
          <h2 className="pdp__section-title">Reviews</h2>

          <div className="pdp__rating-overview">
            <div className="pdp__rating-summary">
              <p className="pdp__rating-number">5.0 Overall Rating</p>
              <StarRow count={5} />
            </div>
            <div className="pdp__rating-bars">
              {[5, 4, 3, 2, 1].map((star, i) => (
                <div key={star} className="pdp__rating-bar-row">
                  <span className="pdp__rating-bar-label">{star}</span>
                  <div className="pdp__rating-bar-track">
                    <div className="pdp__rating-bar-fill" style={{ width: i === 0 ? '100%' : '0%' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="pdp__fit-meter">
              <p className="pdp__fit-meter-label">Runs slightly large</p>
              <div className="pdp__fit-meter-track">
                <div className="pdp__fit-meter-fill" style={{ width: '70%' }} />
              </div>
              <div className="pdp__fit-meter-ends">
                <span>Run small</span><span>Run large</span>
              </div>
            </div>
          </div>

          <div className="pdp__reviews-toolbar">
            <div className="pdp__reviews-filter">
              <span>Filter</span>
              <span className="pdp__reviews-filter-icon">≡</span>
            </div>
            <div className="pdp__reviews-sort">
              <span>Sort by:</span>
              <select className="pdp__reviews-sort-select">
                <option>Highest to Lowest Rating</option>
                <option>Lowest to Highest Rating</option>
                <option>Most Recent</option>
              </select>
            </div>
          </div>

          {reviews.map((r, i) => (
            <div key={i} className="pdp__review">
              <div className="pdp__review-left">
                <p className="pdp__review-name">{r.name}</p>
                <p className="pdp__review-verified">✓ Verified</p>
                <div className="pdp__review-meta">
                  <p>Height: {r.height}</p>
                  <p>Weight: {r.weight}</p>
                  <p>Body Type: {r.bodyType}</p>
                </div>
                <p className="pdp__review-size">Size Purchased: {r.sizePurchased}</p>
                <p className="pdp__review-size">Usual Size: {r.usualSize}</p>
              </div>
              <div className="pdp__review-right">
                <div className="pdp__review-top-row">
                  <StarRow count={r.rating} />
                  <span className="pdp__review-date">{r.date}</span>
                </div>
                <p className="pdp__review-title">{r.title}</p>
                <p className="pdp__review-body">{r.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* transparent pricing */}
        <section className="pdp__pricing-section">
          <h2 className="pdp__pricing-title">Transparent Pricing</h2>
          <p className="pdp__pricing-sub">
            We publish exactly what it costs us to make every product. We believe you deserve to know
            what goes into the things you buy — from materials to labor to transport.
          </p>
          <div className="pdp__pricing-breakdown">
            {transparentPricing.map(item => (
              <div key={item.label} className="pdp__pricing-item">
                <div className="pdp__pricing-icon-wrap">{item.icon}</div>
                <p className="pdp__pricing-item-label">{item.label}</p>
                <p className="pdp__pricing-item-value">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <StoresFooter />
    </>
  )
}
