import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { List } from './pages/poke-list.jsx'
import { Details } from './pages/poke-details.jsx'
import { ErrorPage } from './pages/error-page.jsx'

/* //configuração do router
const router = createBrowserRouter([
  {
    path: '/',
    element: <List />,
    errorElement: <ErrorPage />
  },
  {
    path: '/pokemon/:id',
    element: <Details />,
    errorElement: <ErrorPage />
  }
]) */

  const router = createBrowserRouter([
    
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <List />
      },
      {
        path: '/pokemon/:id',
        element: <Details />
      }
    ]
  },
    
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
