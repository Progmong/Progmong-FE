import { createRoot } from 'react-dom/client'
import Login from './pages/Login'
import App from './App.jsx'

import './Styles/reset.css'
import './Styles/base.css'

createRoot(document.getElementById('root')).render(
  <>
    <Login />
  </>,
)
