import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import './Styles/reset.css'
import './Styles/base.css'
import { ModalProvider } from './context/ModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <ModalProvider>
    <App />
  </ModalProvider>,
)
