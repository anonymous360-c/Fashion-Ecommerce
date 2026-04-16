import Navbar from '../components/layout/Navbar'
import StoresFooter from '../components/layout/StoresFooter'
import AboutHero from '../components/sections/AboutHero'
import AboutMission from '../components/sections/AboutMission'
import AboutFactory from '../components/sections/AboutFactory'
import AboutQuality from '../components/sections/AboutQuality'
import AboutPricing from '../components/sections/AboutPricing'
import AboutMoreToExplore from '../components/sections/AboutMoreToExplore'
import './AboutPage.css'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="about-page">
        <AboutHero />
        <AboutMission />
        <AboutFactory />
        <AboutQuality />
        <AboutPricing />
        <AboutMoreToExplore />
      </main>
      <StoresFooter />
    </>
  )
}
