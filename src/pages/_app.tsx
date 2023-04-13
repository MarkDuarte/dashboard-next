import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Theme } from '../styles/theme'
import { SidebarDrawerProvider } from '@/contexts/SidebarDrawerContext'
import { makeServer } from '@/services/mirage'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={Theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  )
}
