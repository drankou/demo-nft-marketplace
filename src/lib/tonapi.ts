import { HttpClient, Api } from 'tonapi-sdk-js'
import TonWeb from 'tonweb'

let tonapiClient: Api<unknown> | undefined

const tonweb = new TonWeb()

export const getTonApi = () => {
  if (!tonapiClient) {
    const httpClient = new HttpClient({
      baseUrl: 'https://tonapi.io',
      baseApiParams: {
        headers: {
          Authorization: `Bearer ${process.env.TONAPI_TOKEN}`,
          'Content-type': 'application/json',
        },
      },
    })

    tonapiClient = new Api(httpClient)
  }

  return tonapiClient
}

export type NftItem = {
  rawAddress: string
  userFriendlyAddress: string
  ownerAddress: string | null
  image: string | null
  name: string
  description: string | null
}

export const getNftItemsByAddresses = async (addresses: string[]) => {
  const rawAddresses = addresses.map((address) =>
    new tonweb.utils.Address(address).toString(false)
  )

  const { nft_items } = await getTonApi().nft.getNftItemsByAddresses({
    account_ids: rawAddresses,
  })

  const nfts = nft_items.map((nft) => {
    const address = new tonweb.utils.Address(nft.address)

    return {
      rawAddress: nft.address,
      userFriendlyAddress: address.toString(true, true, true),
      ownerAddress:
        (nft.owner &&
          new tonweb.utils.Address(nft.owner.address).toString(
            true,
            true,
            true
          )) ||
        null,
      image:
        nft?.previews?.find((preview) => preview.resolution === '1500x1500')
          ?.url || null,
      name: nft.metadata.name,
      description: nft.metadata.description || null,
    } as NftItem
  })

  return nfts
}
