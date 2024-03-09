import { NftItem } from "@/lib/tonapi";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import shimmer, { toBase64 } from "./ui/shimmer";

export const NftCard = ({ nft }: { nft: NftItem }) => {
  return (
    <Card className="rounded-3xl">
      <CardContent className="p-4">
        <Image
          src={nft.image ?? "/image-not-found.png"}
          alt={nft.name}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(500, 500)
          )}`}
          width={500}
          height={500}
          className="rounded-2xl"
        />
      </CardContent>
      <div className="flex flex-col gap-2 my-2 p-4 pt-0">
        <CardTitle>{nft.name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {nft.description}
        </CardDescription>
      </div>
    </Card>
  );
};
