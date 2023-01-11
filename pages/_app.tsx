import '../styles/global.css'
import NextNProgress from 'nextjs-progressbar'
import { SessionProvider } from "next-auth/react"

import type { AppProps } from "next/app"
import type { Session } from "next-auth"

export default function App({ Component, pageProps: { session, ...pageProps }, 
}:AppProps<{ session: Session }>) {
    
    return (
      <>
      <NextNProgress />
      <SessionProvider session={session}>
      <Component {...pageProps} />
      </SessionProvider>
      </>
    )
  }
  
 