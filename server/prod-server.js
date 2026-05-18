import express from "express";
import helmet from 'helmet';
import fs from "fs";
import path from "path";
import apiRouter from './api.js';
import normalizePort from "./server-utils/normalize-port.js";

import squareWebhookHandler from './endpoints/squareWebhookHandler.js';

const app = express();

const distClient = path.resolve("dist/client");
const distServer = path.resolve("dist/server/entry-server.js");

const port = normalizePort(process.env.PORT || '4000');

app.set('port', port);
app.set('trust proxy', true);


// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        imgSrc: [
          "'self'",
          "data:",
          "https://*.s3.us-west-2.amazonaws.com"
        ],
        connectSrc: [
          "'self'",
          "https://connect.squareup.com"
        ]
      }
    }
  })
);

app.use(express.json());
app.use('/api', apiRouter);
app.post('/square/webhook', squareWebhookHandler);

// static assets
app.use(express.static(distClient, {index: false}));

// SSR bundle
const { render } = await import(distServer);

app.use(async (req, res) => {
 
  const url = req.originalUrl;

  const { appHtml, initialData, helmet } = await render(url,req);

  const template = fs.readFileSync(
    path.join(distClient, "index.html"),
    "utf-8"
  );

  
  const html = template
    .replace(
      "<!--helmet-title-->",
      helmet.title?.toString() || ""
    )
    .replace(
      "<!--helmet-meta-->",
      helmet.meta?.toString() || ""
    )
    .replace("<!--app-html-->", appHtml)
    .replace('null', JSON.stringify(initialData));
    
  // console.log(html);

  res
    .status(200)
    .set({ 'Content-Type': 'text/html' })
    .end(html)
});

app.listen(port, () => {
  console.log(`Production server running on port ${port} - http://localhost:${port}`);
});
