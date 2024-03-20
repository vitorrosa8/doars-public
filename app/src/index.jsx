import App from './app'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {
  GlobalLoaderProvider,
  GlobalUserProvider,
  GlobalToasterProvider,
} from './contexts'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalUserProvider>
        <GlobalToasterProvider>
          <GlobalLoaderProvider>
            <App />
          </GlobalLoaderProvider>
        </GlobalToasterProvider>
      </GlobalUserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)