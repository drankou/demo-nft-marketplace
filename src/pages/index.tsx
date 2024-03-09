import { signOut, useSession } from "next-auth/react";

import { NftCard } from "@/components/NftCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getTableRows, parseNftAddresses } from "@/lib/notion";
import { NftItem, getNftItemsByAddresses } from "@/lib/tonapi";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useState } from "react";

const TABLE_BLOCK_ID = "964b884f-44a3-4637-8440-2f4040a32392";

export const getStaticProps: GetStaticProps = async () => {
  const blocks = await getTableRows({
    block_id: TABLE_BLOCK_ID,
    page_size: 25,
  });
  const nftAddresses = parseNftAddresses(blocks);
  const initialNfts = await getNftItemsByAddresses(nftAddresses);

  return {
    props: {
      initialNfts,
    },
  };
};

export default function Home({ initialNfts }: { initialNfts: Array<NftItem> }) {
  const { data: session } = useSession();
  const [nfts, setNfts] = useState(initialNfts);

  const user = session?.user;

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full px-8 py-6 border-b">
        <Image src="/next.svg" alt="NFT Marketplace" width={100} height={20} />
        <div className="flex items-center justify-end w-full gap-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>
                {(user?.name && user.name[0]) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          <Button className="ml-4" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </div>
      <div className="flex flex-col p-8 w-full mt-4">
        <h1 className="text-4xl font-bold">NFT Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-10 gap-8 mt-8">
          {nfts.map((nft) => (
            <NftCard key={nft.userFriendlyAddress} nft={nft} />
          ))}
        </div>
      </div>
    </div>
  );
}
