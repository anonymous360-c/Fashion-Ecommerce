import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { popularCategories } from '../../data/searchData'
import { products, womenProducts } from '../../data/productsData'
import './SearchPanel.css'

const allProducts = [...products, ...womenProducts]

export default function SearchPanel({ inputRef, onCancel }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    ).slice(0, 8)
  }, [query])

  const showResults     = query.trim().length > 0
  const showCategories  = !showResults

  return (
    <div className="search-panel">
      {/* input row */}
      <div className="search-panel__bar">
        <div className="search-panel__input-wrap">
          <svg className="search-panel__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="11" cy="11" r="7.5" /><path d="m21 21-4.5-4.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search"
            className="search-panel__input"
          />
          {query && (
            <button className="search-panel__clear" onClick={() => setQuery('')} aria-label="Clear">✕</button>
          )}
        </div>
        <button className="search-panel__cancel" onClick={onCancel}>Cancel</button>
      </div>

      <div className="search-panel__body">
        {/* ── search results ── */}
        {showResults && (
          <>
            {results.length > 0 ? (
              <>
                <p className="search-panel__section-title">
                  {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </p>
                <div className="search-panel__results">
                  {results.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="search-result-card"
                      onClick={onCancel}
                    >
                      <div className="search-result-card__img">
                        <img src={product.images[0]} alt={product.name} />
                      </div>
                      <div className="search-result-card__info">
                        <p className="search-result-card__name">{product.name}</p>
                        <p className="search-result-card__color">{product.color}</p>
                        <div className="search-result-card__pricing">
                          <span className="search-result-card__original">${product.originalPrice}</span>
                          <span className="search-result-card__price">${product.price}</span>
                        </div>
                        {product.tags.length > 0 && (
                          <div className="search-result-card__tags">
                            {product.tags.slice(0, 1).map(t => (
                              <span key={t} className="search-result-card__tag">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="search-panel__no-results">
                <p>No results for "<strong>{query}</strong>"</p>
                <p className="search-panel__no-results-sub">Try a different search term or browse our categories below.</p>
              </div>
            )}
          </>
        )}

        {/* ── default: popular categories ── */}
        {showCategories && (
          <>
            <p className="search-panel__section-title">Popular Categories</p>
            <div className="search-panel__grid">
              {popularCategories.map(cat => (
                <a key={cat.label} href="#" className="search-panel__cat" onClick={onCancel}>
                  <div className="search-panel__cat-img">
                    <img src={cat.image} alt={cat.label} />
                  </div>
                  <p className="search-panel__cat-label">{cat.label}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
