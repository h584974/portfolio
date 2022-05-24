import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import AppContextProvider from '../components/AppContextProvider'
import ThemeRoot from '../components/ThemeRoot'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
      <Head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Courgette&family=Oleo+Script&display=swap');
        </style>
      </Head>
      <AppContextProvider>
        <ThemeRoot>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </ThemeRoot>
      </AppContextProvider>
      </>
  )
}
