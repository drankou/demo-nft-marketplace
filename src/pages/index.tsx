import { signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getTableChildrenBlocks, parseNftAddresses } from "@/lib/notion";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useState } from "react";

const TABLE_BLOCK_ID = "964b884f-44a3-4637-8440-2f4040a32392";

export const getStaticProps: GetStaticProps = async () => {
  const blocks = await getTableChildrenBlocks(TABLE_BLOCK_ID);
  const nftAddresses = parseNftAddresses(blocks);

  return {
    props: {
      initialNfts: nftAddresses,
    },
  };
};

export default function Home({ initialNfts }: { initialNfts: string[] }) {
  const { data: session } = useSession();
  const [nfts, setNfts] = useState(initialNfts);

  const user = session?.user;

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full px-8 py-6 border-b">
        <Image src="/next.svg" alt="NFT Marketplace" width={100} height={20} />
        <div className="flex items-center justify-end w-full gap-2">
          <div className="flex items-center gap-2">
            <span>{user?.name}</span>
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
      <div className="flex flex-col p-8 w-full mt-8">
        <h1 className="text-4xl font-bold">NFT Collection</h1>
        <div className="grid grid-cols-1 gap-4 mt-8">
          {nfts.map((nft: string) => (
            <div
              key={nft}
              className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md"
            >
              <h2 className="text-base font-bold">{nft}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
