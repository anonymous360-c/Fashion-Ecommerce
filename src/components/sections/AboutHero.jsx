import './AboutHero.css'

export default function AboutHero() {
  return (
    <section className="about-hero">
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
        alt="Factory worker"
        className="about-hero__img"
      />
      <div className="about-hero__overlay" />
      <div className="about-hero__content">
        <h1 className="about-hero__heading">
          We believe<br />
          we can all<br />
          make<br />
          a difference.
        </h1>
        <p className="about-hero__sub">
          Our why: Exceptional quality.<br />
          Ethical factories. Radical Transparency.
        </p>
      </div>
    </section>
  )
}
