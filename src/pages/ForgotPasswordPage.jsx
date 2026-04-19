import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import './AuthPage.css'

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setSent(true)
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">EVERLANE</Link>
        <h1 className="auth-title">Reset Password</h1>

        {sent ? (
          <div className="auth-success">
            <span className="auth-success__icon">✓</span>
            <p className="auth-success__msg">
              A reset link was sent to <strong>{email}</strong>.
              Check your inbox and follow the instructions.
            </p>
            <Link to="/login" className="auth-submit auth-submit--link">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <p className="auth-sub">
              Enter your email and we'll send you a link to reset your password.
            </p>

            {error && <p className="auth-error">{error}</p>}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="auth-field">
                <label className="auth-label">Email address</label>
                <input
                  className="auth-input"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>

            <p className="auth-switch">
              Remember your password?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function friendlyError(code) {
  const map = {
    'auth/user-not-found':       'No account found with that email.',
    'auth/invalid-email':        'Please enter a valid email address.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  }
  return map[code] || 'Something went wrong. Please try again.'
}
