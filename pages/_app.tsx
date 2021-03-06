import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/globals/navbar/Navbar'
import AppContextProvider from '../components/globals/AppContextProvider'
import Head from 'next/head'
import ContactForm from '../components/globals/ContactForm'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
      <Head>
      <style>
        @import url(&apos;https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Kaushan+Script&family=Noto+Serif&family=Oleo+Script&display=swap&apos;);
      </style>
      </Head>
      <AppContextProvider>
        <Navbar />
        <main>
          <Component {...pageProps} />
          <ContactForm />
        </main>
      </AppContextProvider>
      </>
  )
}
