// React
import ReactDOM from 'react-dom/client'
import React from 'react'

// Contexto global
import { Authenticate } from './Authenticate'

// Estilos
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authenticate />
  </React.StrictMode>
)
