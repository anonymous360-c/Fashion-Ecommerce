import { heroData } from '../../data/homeData'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <img src={heroData.image} alt="Hero" className="hero__img" />
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__heading">{heroData.heading}</h1>
        <p className="hero__sub">{heroData.subheading}</p>
        <button className="hero__cta">{heroData.cta}</button>
      </div>
    </section>
  )
}
