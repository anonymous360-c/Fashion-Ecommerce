import Navbar from '../components/layout/Navbar'
import StoresFooter from '../components/layout/StoresFooter'
import { stores } from '../data/storesData'
import './StoresPage.css'

export default function StoresPage() {
  return (
    <>
      <Navbar />
      <main className="stores-page">
        <div className="stores-page__header">
          <h1 className="stores-page__title">Stores</h1>
          <p className="stores-page__sub">Find one of our 11 stores nearest you.</p>
        </div>

        <div className="stores-page__grid">
          {stores.map(store => (
            <a key={store.name} href="#" className="store-card">
              <div className="store-card__img-wrap">
                <img src={store.image} alt={store.name} />
              </div>
              <p className="store-card__city">{store.city}</p>
              <p className="store-card__name">{store.name}</p>
            </a>
          ))}
        </div>
      </main>
      <StoresFooter />
    </>
  )
}
