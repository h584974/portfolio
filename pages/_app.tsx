import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import AppContextProvider from '../components/AppContextProvider'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
      <Head>
      <style>
        @import url(&apos;https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Kaushan+Script&family=Noto+Serif&family=Oleo+Script&display=swap&apos;);
      </style>
      </Head>
      <AppContextProvider>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </AppContextProvider>
      </>
  )
}
