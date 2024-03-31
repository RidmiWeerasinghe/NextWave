import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/LoginPage'
import Register from './components/Register'
import PageNotFound from './components/PageNotFound'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<div>Home</div>
    },
    {
      path: "/login",
      element:<Login/>
    },
    {
      path: "/register",
      element:<Register/>
    },
    {
      path: "*",
      element:<PageNotFound/>
    },
  ])

  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
