// app/providers.tsx
'use client'

import { Provider } from 'react-redux'
import store from '../app/redux/store'
import { ToastContainer } from 'react-toastify'

export function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      ;<ToastContainer position='top-right' autoClose={3000} />
    </Provider>
  )
}
