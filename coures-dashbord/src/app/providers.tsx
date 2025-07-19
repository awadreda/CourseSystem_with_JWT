// app/providers.tsx
'use client'

import { Provider } from 'react-redux'
import store from '../app/redux/store'
import { ToastContainer } from 'react-toastify'
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import clientSideEmotionCache from '@/lib/emotionCache';
// import theme from '@/theme'; // لو عندك ثيم، لو مش عندك احذفه


export function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache} >


    <Provider store={store}>
      {children}
      ;<ToastContainer position='top-right' autoClose={3000} />
    </Provider>
    </CacheProvider>
  )
}
