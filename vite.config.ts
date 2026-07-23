import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function auditApiDevPlugin(): Plugin {
  const routes: Record<string, string> = {
    '/api/audit/start': '/api/audit/start.ts',
    '/api/audit/seo': '/api/audit/seo.ts',
    '/api/audit/geo': '/api/audit/geo.ts',
    '/api/audit/pagespeed': '/api/audit/pagespeed.ts',
    '/api/audit/generate-pdf': '/api/audit/generate-pdf.ts',
  }
  return {
    name: 'greenlabz-audit-api',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = request.url?.split('?')[0] ?? ''
        const modulePath = routes[path]
        if (!modulePath) return next()
        try {
          let rawBody = ''
          for await (const chunk of request) rawBody += chunk
          Object.assign(request, {
            body: rawBody ? JSON.parse(rawBody) : {},
            query: Object.fromEntries(new URL(request.url || '/', 'http://localhost').searchParams),
          })
          const apiResponse = Object.assign(response, {
            status(code: number) {
              response.statusCode = code
              return apiResponse
            },
            json(payload: unknown) {
              if (!response.headersSent) response.setHeader('content-type', 'application/json; charset=utf-8')
              response.end(JSON.stringify(payload))
              return apiResponse
            },
          })
          const module = await server.ssrLoadModule(modulePath)
          await module.default(request, apiResponse)
        } catch (error) {
          response.statusCode = 500
          response.setHeader('content-type', 'application/json; charset=utf-8')
          response.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Lokaler API-Fehler.' }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), auditApiDevPlugin()],
})
