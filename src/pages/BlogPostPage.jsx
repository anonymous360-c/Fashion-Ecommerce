import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import StoresFooter from '../components/layout/StoresFooter'
import { blogPosts } from '../data/blogData'
import './BlogPostPage.css'

export default function BlogPostPage() {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === id)
  const related = blogPosts.filter(p => p.id !== id).slice(0, 3)

  const [carouselIdx, setCarouselIdx] = useState(0)

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="blogpost-notfound">
          <p>Post not found.</p>
          <Link to="/stories">← Back to Stories</Link>
        </div>
      </>
    )
  }

  const products = post.relatedProducts || []
  const visibleCount = 5

  const prevProduct = () => setCarouselIdx(i => Math.max(0, i - 1))
  const nextProduct = () => setCarouselIdx(i => Math.min(products.length - visibleCount, i + 1))

  return (
    <>
      <Navbar />

      <article className="blogpost">

        {/* ── full-width hero image ── */}
        <div className="blogpost__hero">
          <img src={post.heroImage} alt={post.title} />
        </div>

        {/* ── breadcrumb tags ── */}
        <div className="blogpost__meta">
          <span className="blogpost__breadcrumb">■ ■ ■</span>
        </div>

        {/* ── intro paragraph ── */}
        <div className="blogpost__intro">
          <p className="blogpost__lead">{post.excerpt} Whether top-to-toe white outfits, tonal mixing-and-matching, or a key white piece (or two), give your style a breath of fresh air with this list of winter white closet essentials.</p>
        </div>

        {/* ── first content image ── */}
        {post.contentImage1 && (
          <div className="blogpost__content-img blogpost__content-img--center">
            <img src={post.contentImage1} alt="Editorial" />
          </div>
        )}

        {/* ── article body ── */}
        <div className="blogpost__body">
          <h2 className="blogpost__h2">Nail the Classics</h2>
          <p className="blogpost__p">
            Go pure winter chic with a <a href="#">classic cashmere white sweater</a>. Made in the softest cashmere, it's a sweater that will last season after season. Effortlessly elevating any winter outfit, a white sweater is a must for any capsule collection. Just make sure you <a href="#">keep it clean and stain free</a>, no matter that clean, polished look. Pair it with dark jeans or <a href="#">white flared pants</a> for a casual yet refined ensemble, or layer it over a collared shirt for a preppy touch.
          </p>

          <h2 className="blogpost__h2">Monochromatic Magic</h2>
          <p className="blogpost__p">
            Nothing feels more luxe than an all-white winter outfit. And the best part? You don't have to break the bank to create a super chic top-to-toe look. Pair classic <a href="#">corduroy pants</a> in a modern wide-legged silhouette with a relaxed <a href="#">Oxford style white shirt</a> for a mix-and-match texture play.
          </p>
          <p className="blogpost__p">
            Extra points if you add a <a href="#">white blazer</a>, <a href="#">cardigan</a>, or <a href="#">sweater</a>. Accessorise with subtle metallic accents or a bold red lip for a pop of color, letting your outfit take center stage.
          </p>

          <h2 className="blogpost__h2">Keep Warm in White</h2>
          <p className="blogpost__p">
            Stay warm all winter long with a <a href="#">white puffer jacket</a> puffer jacket. This durable, cold-weather jacket is puffed up for extra warmth, giving an on-point blown-out silhouette. A white coat not only stands out against the sea of dark winter jackets but also provides a fun canvas for experimenting with textures and patterns. Throw on a white coat over a neutral-toned outfit for an easy elegant look.
          </p>
        </div>

        {/* ── second content image ── */}
        {post.contentImage2 && (
          <div className="blogpost__content-img blogpost__content-img--center">
            <img src={post.contentImage2} alt="Editorial 2" />
          </div>
        )}

        {/* ── product carousel ── */}
        {products.length > 0 && (
          <div className="blogpost__products">
            <h3 className="blogpost__products-title">The White Whites Edit</h3>
            <div className="blogpost__products-carousel">
              <button
                className="blogpost__products-arrow"
                onClick={prevProduct}
                disabled={carouselIdx === 0}
              >
                ‹
              </button>
              <div className="blogpost__products-clip">
                <div
                  className="blogpost__products-track"
                  style={{ transform: `translateX(-${carouselIdx * (100 / visibleCount)}%)` }}
                >
                  {products.map(p => (
                    <div key={p.name} className="blogpost__product-card">
                      <div className="blogpost__product-img">
                        <img src={p.image} alt={p.name} />
                      </div>
                      <p className="blogpost__product-name">{p.name}</p>
                      <p className="blogpost__product-price">{p.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="blogpost__products-arrow"
                onClick={nextProduct}
                disabled={carouselIdx >= products.length - visibleCount}
              >
                ›
              </button>
            </div>
            <div className="blogpost__products-cta-wrap">
              <a href="#" className="blogpost__products-cta">Shop Now</a>
            </div>
          </div>
        )}

        {/* ── more body content ── */}
        <div className="blogpost__body">
          <h2 className="blogpost__h2">Textures and Layers</h2>
          <p className="blogpost__p">
            Winter fashion is all about layering, and white outfits provide the perfect base for playing with textures and layers. Start with your <a href="#">white turtleneck</a> and experiment with different fabrics like wool, cashmere, and silk to add depth and interest to your look. A <a href="#">white silk blouse</a> layered under a chunky knit sweater or a white wool skirt paired with a <a href="#">turtleneck</a> creates a textural look that's both cozy and chic.
          </p>

          <h2 className="blogpost__h2">Accessorize with Neutrals</h2>
          <p className="blogpost__p">
            When working with a predominantly white palette, neutrals become your best friends. From <a href="#">white leather Chelsea boots</a> to <a href="#">off-white beanies</a> mix in plenty of winter-ready accessories and shoes for those finishing outfit tonal touches.
          </p>
          <p className="blogpost__p">
            So, step into the season with confidence, and let your winter whites make a bold and beautiful statement. Shop our <a href="#">winter white edit here</a>.
          </p>
        </div>

        {/* ── related posts ── */}
        <div className="blogpost__related">
          {related.map(r => (
            <Link key={r.id} to={`/stories/${r.id}`} className="blogpost__related-card">
              <div className="blogpost__related-img">
                <img src={r.image} alt={r.title} />
              </div>
              <p className="blogpost__related-title">{r.title}</p>
              <span className="blog-card__tag">{r.category}</span>
            </Link>
          ))}
        </div>

      </article>

      <StoresFooter />
    </>
  )
}
