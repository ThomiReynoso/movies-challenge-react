import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { createStore } from './store'
import App from './App'

export function render(url: string) {
  const store = createStore()
  
  const html = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  )
  
  return { 
    html,
    state: store.getState()
  }
}