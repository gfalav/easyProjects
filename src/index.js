import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './comps/layout/Home'
import SignIn from './comps/auth/SignIn'
import SignUp from './comps/auth/SignUp'
import Reset from './comps/auth/Reset'
import Layout from './comps/layout/Layout'
import ErrorPage from './comps/layout/ErrorPage'
import { RecoilRoot } from 'recoil'
import { createTheme, ThemeProvider } from '@mui/material'
import Theme from './comps/layout/Theme'
import ProjectList from './app/projects/ProjectList'
import { ProjectNew } from './app/projects/ProjectNew'
import ProjectShow from './app/projects/ProjectShow'
import Vanos from './app/vanos/Vanos'
import VanosCalc from './app/vanos/vanoscalc/VanosCalc'
import Tramos from './app/tramos/Tramos'

const router = createBrowserRouter([
  { 
    path: '/', element: <Layout />, errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth/signin', element: <SignIn />},
      { path: 'auth/signup', element: <SignUp />},
      { path: 'auth/reset', element: <Reset />},
      { path: 'project', element: <ProjectNew />},
      { path: 'project/:projectId', element: <ProjectShow />},
      { path: 'projectlist', element: <ProjectList />},
      { path: 'tramos/:projectId', element: <Tramos />},
      { path: 'vanos/:projectId', element: <Vanos />},
      { path: 'vanocalc/:vanoId', element: <VanosCalc />}
    ]
  },
])

const theme = createTheme(Theme())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </ThemeProvider>
)