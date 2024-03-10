import { Navbar } from '@/components/NavBar'
import { NftCard, SkeletonNftCard } from '@/components/NftCard'
import { getTableBlocks, parseNftAddresses } from '@/lib/notion'
import { NftItem, getNftItemsByAddresses } from '@/lib/tonapi'
import { debounce } from 'lodash'
import { GetStaticProps } from 'next'
import { useEffect, useRef, useState } from 'react'
import { NftItemsData } from './api/data/nfts'

const TABLE_BLOCK_ID = '964b884f-44a3-4637-8440-2f4040a32392'
const INITIAL_PAGE_SIZE = 5
const PAGE_SIZE = 5

export const getStaticProps: GetStaticProps = async () => {
  const {
    results,
    has_more: hasMore,
    next_cursor: nextCursor,
  } = await getTableBlocks({
    block_id: TABLE_BLOCK_ID,
    page_size: INITIAL_PAGE_SIZE,
    ignoreHeader: true,
  })
  const nftAddresses = parseNftAddresses(results)
  const initialNfts = await getNftItemsByAddresses(nftAddresses)

  return {
    props: {
      initialNfts,
      nextCursor,
      hasMore,
    },
    revalidate: 600, // 10 minutes
  }
}

export default function Home({
  initialNfts,
  nextCursor,
  hasMore,
}: {
  initialNfts: Array<NftItem>
  nextCursor: string
  hasMore: boolean
}) {
  const [nfts, setNfts] = useState(initialNfts)
  const [isLoading, setIsLoading] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(hasMore)
  const [nextCursorValue, setNextCursorValue] = useState(nextCursor)
  const [error, setError] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current
      const { bottom } = container.getBoundingClientRect()
      const { innerHeight } = window

      const spaceToBottom = bottom - innerHeight

      setIsInView(spaceToBottom < 500)
    }
  }

  // Initial scroll check
  useEffect(() => handleScroll(), [])

  useEffect(() => {
    const handleDebouncedScroll = debounce(() => handleScroll(), 50)
    window.addEventListener('scroll', handleDebouncedScroll)
    return () => {
      window.removeEventListener('scroll', handleDebouncedScroll)
    }
  }, [])

  useEffect(() => {
    if (hasMoreData && isInView && !isLoading) {
      loadMoreData()
    }
  }, [isInView, hasMoreData, isLoading])

  const loadMoreData = async () => {
    setIsLoading(true)

    try {
      const { items: newNfts, has_more, next_cursor } = await fetchNfts()
      setNfts((prevNfts) => [...prevNfts, ...newNfts])
      setHasMoreData(has_more)
      setNextCursorValue(next_cursor)
      setIsLoading(false)
    } catch (e) {
      console.error('Error fetching NFTs:', e)
      setError('Error fetching NFTs')
    }

    setIsLoading(false)
  }

  const fetchNfts = async () => {
    const response = await fetch(
      `/api/data/nfts?id=${TABLE_BLOCK_ID}&start_cursor=${nextCursorValue}&page_size=${PAGE_SIZE}`
    )
    const data = await response.json()

    return data as NftItemsData
  }

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="mt-20 flex w-full flex-col p-8">
        <h1 className="text-4xl font-bold">NFT Collection</h1>
        {error && <p className="text-red-500">{error}</p>}
        {nfts.length > 0 ? (
          <div
            ref={containerRef}
            className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-10"
          >
            {nfts.map((nft) => (
              <NftCard key={nft.userFriendlyAddress} nft={nft} />
            ))}
            {isLoading &&
              Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <SkeletonNftCard key={index} />
              ))}
          </div>
        ) : (
          <div className="flex h-96 w-full items-center justify-center">
            <p className="text-lg text-gray-500">No NFTs found</p>
          </div>
        )}
      </div>
    </div>
  )
}
