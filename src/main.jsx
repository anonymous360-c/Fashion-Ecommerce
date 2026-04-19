import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import store from './store'
import { setUser, clearUser } from './store'
import { auth } from './firebase'
import App from './App'
import './index.css'

// listen to Firebase auth state once on boot
// keeps Redux in sync whenever user signs in / out / session restores
onAuthStateChanged(auth, firebaseUser => {
  if (firebaseUser) {
    store.dispatch(setUser({
      uid:         firebaseUser.uid,
      email:       firebaseUser.email,
      displayName: firebaseUser.displayName,
    }))
  } else {
    store.dispatch(clearUser())
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
