import { createBrowserRouter, createHashRouter } from 'react-router'


const createRouter = import.meta.env.PROD ? createHashRouter : createBrowserRouter

const router = createRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pokemon/:id', element: <PokeDetailsPage /> },
    ],
  },
])

export default router;