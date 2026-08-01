import { createServer } from 'http'
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

function serveStatic(dir, port) {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
  }

  const server = createServer((req, res) => {
    let filePath = path.join(dir, req.url === '/' ? 'index.html' : req.url || '')
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(dir, 'index.html')
    }
    const ext = path.extname(filePath).toLowerCase()
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500)
        res.end('Server Error')
        return
      }
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data)
    })
  })

  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve({ close: () => server.close() })
    })
  })
}

async function prerender() {
  console.log('🚀 Starte Static HTML Prerendering...')
  const distDir = path.resolve('dist')

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist Ordner existiert nicht.')
    process.exit(1)
  }

  const server = await serveStatic(distDir, 4173)
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const routes = ['/']

  for (const route of routes) {
    const url = `http://localhost:4173${route}`
    console.log(`📸 Prerendering HTML für: ${url}`)
    await page.goto(url, { waitUntil: 'networkidle' })

    // Warte bis React vollstaendig den DOM gerendert hat
    await page.waitForSelector('#root > *', { timeout: 15000 })

    const htmlContent = await page.content()
    const targetFile = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route, 'index.html')

    fs.mkdirSync(path.dirname(targetFile), { recursive: true })
    fs.writeFileSync(targetFile, htmlContent, 'utf-8')
    console.log(`✅ Static Prerendered HTML gespeichert (${Math.round(htmlContent.length / 1024)} KB)`)
  }

  await browser.close()
  server.close()
  console.log('🎉 Static HTML Prerendering erfolgreich abgeschlossen!')
}

prerender().catch((err) => {
  console.error('❌ Fehler beim Prerendering:', err)
  process.exit(1)
})
