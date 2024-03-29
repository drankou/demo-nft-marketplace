import { truncateAddress } from '@/lib/helpers'
import { NftItem } from '@/lib/tonapi'
import { cn } from '@/lib/utils'
import { CopyIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import shimmer, { toBase64 } from './ui/shimmer'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export const NftCard = ({ nft }: { nft: NftItem }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Card className="rounded-3xl">
      <CardContent className="relative aspect-square w-full overflow-hidden rounded-3xl rounded-b-none border-b">
        <Image
          src={nft.image ?? '/image-not-found.png'}
          alt={nft.name}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(500, 500)
          )}`}
          fill
          sizes="100% 100%"
          className={cn(
            'duration-300 ease-in-out',
            isLoading ? 'scale-110 blur-xl' : 'scale-100 blur-0'
          )}
          onLoad={() => setIsLoading(false)}
        />
      </CardContent>
      <div className="flex flex-col gap-2 p-4">
        <CardTitle>{nft.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {nft.description ?? 'No description'}
        </CardDescription>
        <div className="mt-4 flex flex-col gap-2">
          {nft.ownerAddress && (
            <CardMetadata label="Owner" value={nft.ownerAddress} />
          )}
          <CardMetadata label="Address" value={nft.userFriendlyAddress} />
          <CardMetadata label="Raw address" value={nft.rawAddress} />
        </div>
      </div>
    </Card>
  )
}

const CardMetadata = ({ label, value }: { label: string; value: string }) => {
  const [isCopied, setIsCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setIsCopied(true)
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-xs font-semibold text-gray-500">{label}:</span>
      <div className="flex w-full items-center">
        <span className="text-sm text-gray-500">{truncateAddress(value)}</span>

        <Tooltip
          open={isCopied}
          onOpenChange={(open) => !open && setIsCopied(false)}
        >
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="ml-auto h-7 w-7"
              onClick={() => handleCopy()}
            >
              <CopyIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={5}>Copied</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export const SkeletonNftCard = () => (
  <Card className="rounded-3xl">
    <CardContent className="relative aspect-square w-full overflow-hidden rounded-3xl rounded-b-none border-b p-0">
      <div className="h-full w-full bg-gray-100" />
    </CardContent>
    <div className="flex flex-col gap-2 p-4">
      <CardTitle>
        <div className="h-6 w-3/4 bg-gray-100" />
      </CardTitle>
      <div className="h-6 w-full bg-gray-100" />
      <div className="mt-4 flex flex-col gap-4">
        <CardMetadataSkeleton />
        <CardMetadataSkeleton />
        <CardMetadataSkeleton />
      </div>
    </div>
  </Card>
)

const CardMetadataSkeleton = () => (
  <div className="flex flex-col items-start gap-1">
    <div className="h-3 w-1/4 bg-gray-100/40" />
    <div className="flex w-full items-center">
      <div className="h-3 w-3/4 bg-gray-100/40" />
    </div>
  </div>
)
