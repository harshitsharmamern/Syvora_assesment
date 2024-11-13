import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './Context/Store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <App />
  </Provider>
)
