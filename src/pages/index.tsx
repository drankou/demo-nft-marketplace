import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export async function getStaticProps() {
  return {
    props: {
      initialNfts: [
        {
          id: 1,
          name: "First NFT",
          description: "Description of the first NFT.",
        },
        {
          id: 2,
          name: "Second NFT",
          description: "Description of the second NFT.",
        },
      ],
    },
  };
}

export default function Home({ initialNfts }: { initialNfts: any }) {
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
          {nfts.map((nft: any) => (
            <div
              key={nft.id}
              className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md"
            >
              <h2 className="text-2xl font-bold">{nft.name}</h2>
              <p className="mt-2">{nft.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
