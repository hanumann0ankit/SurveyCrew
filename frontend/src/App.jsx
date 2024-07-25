import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";


const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: < SignIn/>
    },
    {
      path: "/signup",
      element: <SignUp />
    },
  ]
);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
