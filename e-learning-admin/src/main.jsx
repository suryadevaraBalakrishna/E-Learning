import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import { Provider } from 'react-redux'
import { myStore } from './store/store.js'


createRoot(document.getElementById('root')).render(
    <Provider store={myStore}>
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
  </Provider>
)
