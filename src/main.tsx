import { ViteReactSSG } from 'vite-react-ssg'
import App from './App.tsx'
import appCssUrl from './App.css?url'
import './index.css'

if (typeof document !== 'undefined' && !document.querySelector(`link[data-greenlabz-app-css]`)) {
  const appStyles = document.createElement('link')
  appStyles.rel = 'stylesheet'
  appStyles.href = appCssUrl
  appStyles.media = 'print'
  appStyles.dataset.greenlabzAppCss = 'true'
  appStyles.onload = () => { appStyles.media = 'all' }
  document.head.appendChild(appStyles)
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


