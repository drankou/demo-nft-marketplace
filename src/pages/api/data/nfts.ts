import { getTableRows, parseNftAddresses } from "@/lib/notion";
import { getNftItemsByAddresses, getTonApi } from "@/lib/tonapi";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, start_cursor, page_size = 5 } = req.query;

  const tableBlocks = await getTableRows({
    block_id: id as string,
    start_cursor: start_cursor as string,
    page_size: parseInt(page_size as string),
  });
  const addresses = parseNftAddresses(tableBlocks) as string[];
  const nfts = await getNftItemsByAddresses(addresses);

  res.status(200).json(nfts);
};

export default handler;
