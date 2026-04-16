import './AboutQuality.css'

export default function AboutQuality() {
  return (
    <section className="about-quality">
      {/* left: beige block with text */}
      <div className="about-quality__text-block">
        <p className="about-quality__label">OUR QUALITY</p>
        <h2 className="about-quality__heading">Designed<br />to last.</h2>
        <p className="about-quality__body">
          At Everlane, we're not big on trends. We want you to wear our pieces for
          years, even decades, so we source the finest materials and factories for our
          timeless products—like our Grade A cashmere sweaters, Italian shoes, and
          Peruvian Pima tees.
        </p>
      </div>

      {/* right: product detail photo */}
      <div className="about-quality__img-block">
        <img
          src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
          alt="Quality fabric detail"
        />
      </div>

      {/* bottom: wide pattern/detail photo */}
      <div className="about-quality__wide-img">
        <img
          src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1400&q=80"
          alt="Fabric pattern detail"
        />
      </div>
    </section>
  )
}
