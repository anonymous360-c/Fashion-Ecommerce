import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import StoresFooter from '../components/layout/StoresFooter'
import { blogPosts, progressItems } from '../data/blogData'
import './BlogPage.css'

const INITIAL_VISIBLE = 6

export default function BlogPage() {
  const [visible, setVisible] = useState(INITIAL_VISIBLE)

  const shownPosts = blogPosts.slice(0, visible)
  const hasMore = visible < blogPosts.length

  return (
    <>
      <Navbar />

      <main className="blog-page">

        {/* ── masthead ── */}
        <div className="blog-page__masthead">
          <div className="blog-page__masthead-bar" />
          <h1 className="blog-page__title">everworld</h1>
          <p className="blog-page__tagline">
            We're on a mission to clean up a dirty industry.<br />
            These are the people, stories, and ideas that will help us get there.
          </p>
        </div>

        {/* ── latest articles grid ── */}
        <section className="blog-page__latest">
          <h2 className="blog-page__section-heading">The Latest</h2>

          <div className="blog-page__grid">
            {shownPosts.map(post => (
              <Link
                key={post.id}
                to={`/stories/${post.id}`}
                className="blog-card"
              >
                <div className="blog-card__img-wrap">
                  <img src={post.image} alt={post.title} />
                </div>
                <h3 className="blog-card__title">{post.title}</h3>
                <span className="blog-card__tag">{post.category}</span>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="blog-page__load-wrap">
              <button
                className="blog-page__load-btn"
                onClick={() => setVisible(v => v + 6)}
              >
                Load more Articles
              </button>
            </div>
          )}
        </section>

        {/* ── scrolling marquee ── */}
        <div className="blog-page__marquee-wrap">
          <div className="blog-page__marquee">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="blog-page__marquee-track">
                Keep it Clean <span className="blog-page__marquee-icon">⌂</span>
                Do right by people <span className="blog-page__marquee-icon">⌂</span>
                Keep It Clean <span className="blog-page__marquee-icon">⌂</span>
                Do right by people <span className="blog-page__marquee-icon">⌂</span>&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── our progress ── */}
        <section className="blog-page__progress">
          <h2 className="blog-page__section-heading">Our Progress</h2>
          <div className="blog-page__progress-grid">
            {progressItems.map(item => (
              <a key={item.label} href="#" className="progress-card">
                <div className="progress-card__img-wrap">
                  <img src={item.image} alt={item.label} />
                </div>
                <p className="progress-card__label">{item.label}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ── social CTA ── */}
        <section className="blog-page__social">
          <h2 className="blog-page__social-heading">Follow us on social for more</h2>
          <a
            href="https://instagram.com/everlane"
            target="_blank"
            rel="noreferrer"
            className="blog-page__social-btn"
          >
            @Everlane Instagram
          </a>
        </section>

      </main>

      <StoresFooter />
    </>
  )
}
