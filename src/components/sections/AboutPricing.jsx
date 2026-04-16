import './AboutPricing.css'

export default function AboutPricing() {
  return (
    <section className="about-pricing">
      {/* bar chart */}
      <div className="about-pricing__chart">
        <div className="about-pricing__chart-bars">
          <div className="about-pricing__bar-group">
            <span className="about-pricing__bar-price">$30</span>
            <div className="about-pricing__bar about-pricing__bar--everlane" />
            <span className="about-pricing__bar-label">Everlane T-shirt</span>
          </div>
          <div className="about-pricing__bar-group">
            <span className="about-pricing__bar-price">$50</span>
            <div className="about-pricing__bar about-pricing__bar--retail" />
            <span className="about-pricing__bar-label">Traditional Retail</span>
          </div>
        </div>
      </div>

      {/* text block */}
      <div className="about-pricing__text">
        <p className="about-pricing__label">OUR PRICES</p>
        <h2 className="about-pricing__heading">Radically Transparent.</h2>
        <p className="about-pricing__body">
          We believe our customers have a right to know how much their clothes
          cost to make. We reveal the true costs behind all of our products—from
          materials to labor to transportation—then offer them to you, minus the
          traditional retail markup.
        </p>
      </div>
    </section>
  )
}
