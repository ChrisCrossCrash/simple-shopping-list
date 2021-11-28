import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'modern-normalize'
import '@chris-cross-crash/ck-css'
import { ItemsProvider } from './ItemsContext'

ReactDOM.render(
  <React.StrictMode>
    <ItemsProvider>
      <App />
    </ItemsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
