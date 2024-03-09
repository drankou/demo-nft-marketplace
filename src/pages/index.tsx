import { Navbar } from '@/components/NavBar'
import { NftCard } from '@/components/NftCard'
import { getTableRows, parseNftAddresses } from '@/lib/notion'
import { NftItem, getNftItemsByAddresses } from '@/lib/tonapi'
import { GetStaticProps } from 'next'
import { useState } from 'react'

const TABLE_BLOCK_ID = '964b884f-44a3-4637-8440-2f4040a32392'

export const getStaticProps: GetStaticProps = async () => {
  const blocks = await getTableRows({
    block_id: TABLE_BLOCK_ID,
    page_size: 25,
  })
  const nftAddresses = parseNftAddresses(blocks)
  const initialNfts = await getNftItemsByAddresses(nftAddresses)

  return {
    props: {
      initialNfts,
    },
  }
}

export default function Home({ initialNfts }: { initialNfts: Array<NftItem> }) {
  const [nfts, setNfts] = useState(initialNfts)

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="mt-4 flex w-full flex-col p-8">
        <h1 className="text-4xl font-bold">NFT Collection</h1>
        {nfts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-10">
            {nfts.map((nft) => (
              <NftCard key={nft.userFriendlyAddress} nft={nft} />
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
