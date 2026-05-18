import express from 'express'
import fs from 'fs'
import { createServer as createViteServer } from 'vite'

import apiRouter from './api.js';

import squareWebhookHandler from './endpoints/squareWebhookHandler.js';


async function start() {
  const app = express()

  app.set('trust proxy', true);

  app.use(express.json());
  app.use('/api', apiRouter)
  app.post('/square/webhook', squareWebhookHandler);


  app.use(express.static('public'))

  const vite = await createViteServer({
    server: {
      middlewareMode: true
    },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use(async (req, res) => {
    const url = req.originalUrl

    try {
      let template = fs.readFileSync(
        'index.html',
        'utf-8'
      )

      template = await vite.transformIndexHtml(
        url,
        template
      )

      const { render } = await vite.ssrLoadModule(
        '/src/entry-server.jsx'
      )

      const {
        appHtml,
        initialData,
        helmet
      } = await render(url,req);


      const html = template
        .replace(
          "<!--helmet-title-->",
          helmet.title?.toString() || ""
        )
        .replace(
          "<!--helmet-meta-->",
          helmet.meta?.toString() || ""
        )
        .replace('<!--app-html-->', appHtml)
        .replace('null', JSON.stringify(initialData ?? null));

      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(html)

    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)

      res.status(500).end(e.message)
    }
  })

  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
}

start()
