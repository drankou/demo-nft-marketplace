import { Client, isFullBlock } from "@notionhq/client";
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

let notionClient: Client;

export const getNotionClient = () => {
  if (!notionClient) {
    notionClient = new Client({
      auth: process.env.NOTION_TOKEN,
    });
  }

  return notionClient;
};

export const getTableChildrenBlocks = async (blockId: string) => {
  const notion = getNotionClient();

  const response = await notion.blocks.children.list({
    block_id: blockId,
  });

  return response.results;
};

export const parseNftAddresses = (
  results: BlockObjectResponse[] | PartialBlockObjectResponse[]
) => {
  return results
    .map((block) => {
      if (isFullBlock(block)) {
        if (block.type === "table_row") {
          const cells = block.table_row.cells.map((cell) => {
            return cell.map((content) => {
              if (!content.annotations.bold) {
                return content.plain_text;
              }
            });
          });

          return cells[0][0];
        }
      }
    })
    .filter(Boolean);
};
