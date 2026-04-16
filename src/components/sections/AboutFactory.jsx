import './AboutFactory.css'

export default function AboutFactory() {
  return (
    <section className="about-factory">
      {/* top split: big photo left, beige + text right */}
      <div className="about-factory__top">
        <div className="about-factory__top-img">
          <img
            src="https://images.unsplash.com/photo-1537832816519-689ad163238b?w=900&q=80"
            alt="Factory worker smiling"
          />
        </div>
        <div className="about-factory__top-text">
          <p className="about-factory__label">OUR FACTORIES</p>
          <h2 className="about-factory__heading">Our ethical approach.</h2>
          <p className="about-factory__body">
            We spend months finding the best factories around the world—the same
            ones that produce your favorite designer labels. We visit them often and
            build strong personal relationships with the owners. Each factory is given
            a compliance audit to evaluate factors like fair wages, reasonable hours,
            and environment. Our goal? A score of 90 or above for every factory.
          </p>
        </div>
      </div>

      {/* bottom: two landscape detail images side by side */}
      <div className="about-factory__bottom">
        <div className="about-factory__bottom-img">
          <img
            src="https://images.unsplash.com/photo-1581772092941-4e56f944b50c?w=800&q=80"
            alt="Factory machinery"
          />
        </div>
        <div className="about-factory__bottom-img">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
            alt="Factory detail"
          />
        </div>
      </div>
    </section>
  )
}
