import fs from 'node:fs/promises'
import express from 'express'
import compression from 'compression'
import sirv from 'sirv'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined

// Create http server
const app = express()

// Add compression middleware
app.use(compression())

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
} else {
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.get('*', async (req, res, next) => {
  if (req.path.startsWith('/api/') || req.path.includes('.')) {
    return next()
  }
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const { html: rendered, state } = await render(url)

    const html = template
      .replace(`<!--ssr-outlet-->`, rendered)
      .replace(
        `<!--ssr-state-->`,
        `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(
          /</g,
          '\\u003c'
        )}</script>`
      )

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    console.error(e.stack)
    if (!isProduction) {
      vite?.ssrFixStacktrace(e)
    }
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})