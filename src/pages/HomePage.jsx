import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import ShopByCategory from '../components/sections/ShopByCategory'
import EditorialGrid from '../components/sections/EditorialGrid'
import FavoritesCarousel from '../components/sections/FavoritesCarousel'
import Testimonial from '../components/sections/Testimonial'
import GiftPicks from '../components/sections/GiftPicks'
import EverlaneBanner from '../components/sections/EverlaneBanner'
import UGCStrip from '../components/sections/UGCStrip'
import Perks from '../components/sections/Perks'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ShopByCategory />
        <EditorialGrid />
        <FavoritesCarousel />
        <Testimonial />
        <GiftPicks />
        <EverlaneBanner />
        <UGCStrip />
        <Perks />
      </main>
      <Footer />
    </>
  )
}
