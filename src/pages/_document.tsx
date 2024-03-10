import { cn } from '@/lib/utils'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>💎 Marketplace </title>
        <meta
          name="description"
          content="Next.js demo app for listing NFTs from Notion table."
        />
        <meta property="og:title" content="Demo NFT Marketplace" />
        <meta
          property="og:description"
          content="Next.js demo app for listing NFTs from Notion table."
        />
        <meta property="og:image" content="/opengraph-image.png" />
      </Head>
      <body className={cn('min-h-screen')}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
