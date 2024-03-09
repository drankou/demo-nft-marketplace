import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const user = session?.user
  return (
    <SessionProvider session={session}>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
