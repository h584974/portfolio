import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import AppContextProvider from '../components/AppContextProvider'
import Root from '../components/Root'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <AppContextProvider>
        <Root>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </Root>
      </AppContextProvider>
  )
}
