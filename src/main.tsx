import { ViteReactSSG } from 'vite-react-ssg'
import App from './App.tsx'
import appCssUrl from './App.css?url'
import './index.css'

if (typeof document !== 'undefined') {
  const markStylesReady = () => document.documentElement.classList.add('js-ready')
  const existingStyles = document.querySelector<HTMLLinkElement>('link[data-greenlabz-app-css]')

  if (existingStyles) {
    if (existingStyles.media === 'all') markStylesReady()
    else existingStyles.addEventListener('load', markStylesReady, { once: true })
  } else {
    const appStyles = document.createElement('link')
    appStyles.rel = 'stylesheet'
    appStyles.href = appCssUrl
    appStyles.media = 'print'
    appStyles.dataset.greenlabzAppCss = 'true'
    appStyles.onload = () => {
      appStyles.media = 'all'
      markStylesReady()
    }
    document.head.appendChild(appStyles)
  }
}

export const createRoot = ViteReactSSG({
  routes: [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/apps',
      element: <App />,
    },
    {
      path: '/impressum',
      element: <App />,
    },
    {
      path: '/datenschutz',
      element: <App />,
    },
  ],
})

export const createApp = createRoot
export default createRoot
