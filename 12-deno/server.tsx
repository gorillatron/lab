import { serve } from "https://deno.land/std@v0.30.0/http/server.ts"
// @deno-types="https://servestjs.org/@/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://servestjs.org/@/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";

const main = async () => {

  const server = serve({ port: 8000 })

  for await (const req of server) {
    const html = ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Deno hello world</title>
        </head>
        <body>Hello World!</body>
      </html>
    )
    req.respond({ body: html });
  }

}

main()