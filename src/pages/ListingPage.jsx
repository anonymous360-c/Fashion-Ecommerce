import { useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import StoresFooter from '../components/layout/StoresFooter'
import {
  products, categories, colors, waistSizes, clothingSizes,
  womenProducts, womenCategories, womenSizes, shoeSizes,
} from '../data/productsData'
import './ListingPage.css'

export default function ListingPage({ gender }) {
  const isWomen = gender === 'women'

  const allProducts   = isWomen ? womenProducts : products
  const allCategories = isWomen ? womenCategories : categories

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedColors,   setSelectedColors]   = useState([])
  const [selectedSizes,    setSelectedSizes]     = useState([])
  const [showAllCats,      setShowAllCats]       = useState(false)
  const [showAllColors,    setShowAllColors]     = useState(false)
  const [catOpen,          setCatOpen]           = useState(true)
  const [colorOpen,        setColorOpen]         = useState(true)
  const [sizeOpen,         setSizeOpen]          = useState(true)

  const visibleCats   = showAllCats   ? allCategories : allCategories.slice(0, 5)
  const visibleColors = showAllColors ? colors        : colors.slice(0, 9)

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const passCategory = !selectedCategory || p.category === selectedCategory
      const passColor    = selectedColors.length === 0 ||
        selectedColors.some(c => p.colorSwatches && p.color.toLowerCase().includes(c.toLowerCase()))
      return passCategory && passColor
    })
  }, [allProducts, selectedCategory, selectedColors])

  function toggleColor(name) {
    setSelectedColors(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    )
  }

  function toggleSize(s) {
    setSelectedSizes(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  function selectCategory(cat) {
    setSelectedCategory(prev => prev === cat ? null : cat)
  }

  const pageTitle = isWomen
    ? "Women's Clothing & Apparel - New Arrivals"
    : "Men's Clothing & Apparel - New Arrivals"

  const primarySizes = isWomen ? womenSizes : clothingSizes

  return (
    <>
      <Navbar />
      <div className="listing-page">

        {/* ── sidebar ── */}
        <aside className="listing-sidebar">
          <p className="listing-sidebar__count">{filteredProducts.length} Products</p>

          {/* Category */}
          <div className="listing-filter">
            <button className="listing-filter__header" onClick={() => setCatOpen(v => !v)}>
              <span>Category</span>
              <span className="listing-filter__chevron">{catOpen ? '∧' : '∨'}</span>
            </button>
            {catOpen && (
              <div className="listing-filter__body">
                {visibleCats.map(cat => (
                  <label
                    key={cat}
                    className={`listing-filter__checkbox-row ${selectedCategory === cat ? 'listing-filter__checkbox-row--active' : ''}`}
                    onClick={() => selectCategory(cat)}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={selectedCategory === cat}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
                <button
                  className="listing-filter__view-more"
                  onClick={() => setShowAllCats(v => !v)}
                >
                  {showAllCats ? 'View Less −' : 'View More +'}
                </button>
              </div>
            )}
          </div>

          {/* Color */}
          <div className="listing-filter">
            <button className="listing-filter__header" onClick={() => setColorOpen(v => !v)}>
              <span>Color</span>
              <span className="listing-filter__chevron">{colorOpen ? '∧' : '∨'}</span>
            </button>
            {colorOpen && (
              <div className="listing-filter__body">
                <div className="listing-filter__swatches">
                  {visibleColors.map(color => (
                    <button
                      key={color.name}
                      className={`listing-filter__swatch-btn ${selectedColors.includes(color.name) ? 'listing-filter__swatch-btn--active' : ''}`}
                      onClick={() => toggleColor(color.name)}
                      title={color.name}
                    >
                      <span className="listing-filter__swatch" style={{ background: color.hex }} />
                      <span className="listing-filter__swatch-label">{color.name}</span>
                    </button>
                  ))}
                </div>
                <button
                  className="listing-filter__view-more"
                  onClick={() => setShowAllColors(v => !v)}
                >
                  {showAllColors ? 'View Less −' : 'View More +'}
                </button>
              </div>
            )}
          </div>

          {/* Size */}
          <div className="listing-filter">
            <button className="listing-filter__header" onClick={() => setSizeOpen(v => !v)}>
              <span>Size</span>
              <span className="listing-filter__chevron">{sizeOpen ? '∧' : '∨'}</span>
            </button>
            {sizeOpen && (
              <div className="listing-filter__body">
                {!isWomen && (
                  <>
                    <p className="listing-filter__size-group-label">Waist</p>
                    <div className="listing-filter__sizes">
                      {waistSizes.map(s => (
                        <button
                          key={s}
                          className={`listing-filter__size-btn ${selectedSizes.includes(s) ? 'listing-filter__size-btn--active' : ''}`}
                          onClick={() => toggleSize(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <p className="listing-filter__size-group-label">Clothing</p>
                <div className="listing-filter__sizes">
                  {primarySizes.map(s => (
                    <button
                      key={s}
                      className={`listing-filter__size-btn ${selectedSizes.includes(s) ? 'listing-filter__size-btn--active' : ''}`}
                      onClick={() => toggleSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {isWomen && (
                  <>
                    <p className="listing-filter__size-group-label">Shoes</p>
                    <div className="listing-filter__sizes listing-filter__sizes--shoes">
                      {shoeSizes.map(s => (
                        <button
                          key={s}
                          className={`listing-filter__size-btn ${selectedSizes.includes(s) ? 'listing-filter__size-btn--active' : ''}`}
                          onClick={() => toggleSize(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* ── main ── */}
        <main className="listing-main">
          <div className="listing-main__header">
            <p className="listing-main__breadcrumb">
              <Link to="/">Home</Link>
              {' / '}
              <Link to={isWomen ? '/women' : '/men'}>{isWomen ? 'Women' : 'Men'}</Link>
            </p>
            <h1 className="listing-main__title">{pageTitle}</h1>
            <p className="listing-main__featured-label">Featured</p>
          </div>

          {/* active filter chips */}
          {(selectedCategory || selectedColors.length > 0 || selectedSizes.length > 0) && (
            <div className="listing-main__active-filters">
              {selectedCategory && (
                <button
                  className="listing-main__filter-chip"
                  onClick={() => setSelectedCategory(null)}
                >
                  {selectedCategory} ×
                </button>
              )}
              {selectedColors.map(c => (
                <button
                  key={c}
                  className="listing-main__filter-chip"
                  onClick={() => toggleColor(c)}
                >
                  {c} ×
                </button>
              ))}
              {selectedSizes.map(s => (
                <button
                  key={s}
                  className="listing-main__filter-chip"
                  onClick={() => toggleSize(s)}
                >
                  {s} ×
                </button>
              ))}
            </div>
          )}

          <div className="listing-grid">
            {filteredProducts.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="product-card"
              >
                <div className="product-card__img-wrap">
                  {product.badge && (
                    <span className="product-card__badge">{product.badge}</span>
                  )}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-card__img product-card__img--primary"
                  />
                  <img
                    src={product.images[1] || product.images[0]}
                    alt={product.name}
                    className="product-card__img product-card__img--hover"
                  />
                </div>

                <div className="product-card__info">
                  <p className="product-card__name">{product.name}</p>
                  <div className="product-card__pricing">
                    <span className="product-card__original">${product.originalPrice}</span>
                    <span className="product-card__price">${product.price}</span>
                  </div>
                </div>

                <p className="product-card__color">{product.color}</p>

                <div className="product-card__swatches">
                  {product.colorSwatches.map((hex, i) => (
                    <span key={i} className="product-card__swatch" style={{ background: hex }} />
                  ))}
                </div>

                {product.tags.length > 0 && (
                  <div className="product-card__tags">
                    {product.tags.map(tag => (
                      <span key={tag} className="product-card__tag">{tag}</span>
                    ))}
                  </div>
                )}
              </Link>
            ))}

            {filteredProducts.length === 0 && (
              <div className="listing-grid__empty">
                <p>No products match your filters.</p>
                <button onClick={() => { setSelectedCategory(null); setSelectedColors([]); setSelectedSizes([]) }}>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
      <StoresFooter />
    </>
  )
}
