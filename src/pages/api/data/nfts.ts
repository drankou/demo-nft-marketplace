import { getTableBlocks, parseNftAddresses } from '@/lib/notion'
import { NftItem, getNftItemsByAddresses } from '@/lib/tonapi'
import { NextApiRequest, NextApiResponse } from 'next'

export type NftItemsData = {
  items: Array<NftItem>
  next_cursor: string
  has_more: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, start_cursor, page_size = 5 } = req.query

  const { results, has_more, next_cursor } = await getTableBlocks({
    block_id: id as string,
    start_cursor: start_cursor as string,
    page_size: parseInt(page_size as string),
  })
  const addresses = parseNftAddresses(results)
  const nfts = await getNftItemsByAddresses(addresses)

  res.status(200).json({
    items: nfts,
    next_cursor,
    has_more,
  })
}

export default handler
