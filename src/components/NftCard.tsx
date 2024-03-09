import { NftItem } from "@/lib/tonapi";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import shimmer, { toBase64 } from "./ui/shimmer";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { truncateAddress } from "@/lib/helpers";
import { Button } from "./ui/button";
import { CopyIcon } from "@radix-ui/react-icons";

export const NftCard = ({ nft }: { nft: NftItem }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card className="rounded-3xl">
      <CardContent className="w-full relative aspect-square overflow-hidden rounded-2xl rounded-b-none border-b">
        <Image
          src={nft.image ?? "/image-not-found.png"}
          alt={nft.name}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(500, 500)
          )}`}
          fill
          objectFit="cover"
          className={cn(
            "duration-300 ease-in-out",
            isLoading ? "blur-xl scale-110" : "blur-0 scale-100"
          )}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </CardContent>
      <div className="flex flex-col gap-2 p-4">
        <CardTitle>{nft.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {nft.description ?? "No description"}
        </CardDescription>
        <div className="flex flex-col gap-2 mt-4">
          {nft.ownerAddress && (
            <CardMetadata
              label="Owner"
              value={truncateAddress(nft.ownerAddress)}
            />
          )}
          <CardMetadata
            label="Address"
            value={truncateAddress(nft.userFriendlyAddress)}
          />
          <CardMetadata
            label="Raw address"
            value={truncateAddress(nft.rawAddress)}
          />
        </div>
      </div>
    </Card>
  );
};

const CardMetadata = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-start gap-1">
    <span className="text-xs font-semibold text-gray-500">{label}:</span>
    <div className="w-full flex items-center">
      <span className="text-sm text-gray-500">{value}</span>
      <Button size="icon" variant="outline" className="w-6 h-6 ml-auto">
        <CopyIcon />
      </Button>
    </div>
  </div>
);
