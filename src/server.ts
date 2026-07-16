import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * DO NOT TOUCH HEADERS (IMPORTANT)
 * Let Angular handle request as-is
 */

/**
 * Static files
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * SSR handler
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        return writeResponseToNodeResponse(response, res);
      }
      return next();
    })
    .catch(next);
});

/**
 * Start server
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;

  app.listen(port, () => {
    console.log(`SSR running at http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);