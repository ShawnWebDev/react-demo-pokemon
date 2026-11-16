import { createBrowserRouter } from "react-router";
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
])

export default router;