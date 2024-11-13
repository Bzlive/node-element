import { createBrowserRouter } from 'react-router-dom'
import { routes } from './router'

const router = createBrowserRouter(routes, { basename: '/'})

export default router