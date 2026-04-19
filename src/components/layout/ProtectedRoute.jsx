import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectUser, selectAuthLoading } from '../../store'

// Wraps any route that requires the user to be signed in.
// Redirects to /login and passes the current path so we can
// bounce back after a successful sign-in.
export default function ProtectedRoute({ children }) {
  const user    = useSelector(selectUser)
  const loading = useSelector(selectAuthLoading)
  const location = useLocation()

  // Firebase is still checking the session — show nothing yet
  if (loading) return null

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}
