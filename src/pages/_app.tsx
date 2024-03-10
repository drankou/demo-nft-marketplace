import { TooltipProvider } from '@/components/ui/tooltip'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <TooltipProvider>
        <Head>
          <title>💎 Marketplace</title>
        </Head>
        <main>
          <Component {...pageProps} />
        </main>
      </TooltipProvider>
    </SessionProvider>
  )
}
