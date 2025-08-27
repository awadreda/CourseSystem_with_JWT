import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './Redux/store.ts'
import { RouterProvider } from 'react-router'
import router from './Routes/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>

  <StrictMode>

   <RouterProvider router={router} />
  </StrictMode>,
  </Provider>
)
