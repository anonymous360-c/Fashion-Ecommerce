import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage         from './pages/HomePage'
import AboutPage        from './pages/AboutPage'
import StoresPage       from './pages/StoresPage'
import BlogPage         from './pages/BlogPage'
import BlogPostPage     from './pages/BlogPostPage'
import ListingPage      from './pages/ListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import LoginPage        from './pages/LoginPage'
import SignupPage       from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ProtectedRoute   from './components/layout/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/"                element={<HomePage />} />
        <Route path="/women"           element={<ListingPage gender="women" />} />
        <Route path="/men"             element={<ListingPage gender="men" />} />
        <Route path="/about"           element={<AboutPage />} />
        <Route path="/stores"          element={<StoresPage />} />
        <Route path="/stories"         element={<BlogPage />} />
        <Route path="/stories/:id"     element={<BlogPostPage />} />
        <Route path="/product/:id"     element={<ProductDetailPage />} />

        {/* auth routes — redirect to home if already logged in */}
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/signup"          element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  )
}
