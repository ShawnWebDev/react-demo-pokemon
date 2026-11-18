import { createBrowserRouter, createHashRouter } from 'react-router'
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import PokeDetailsPage from "./pages/PokeDetailsPage.jsx";


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