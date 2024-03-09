import { Client, isFullBlock } from "@notionhq/client";
import {
  ListBlockChildrenParameters,
  TableRowBlockObjectResponse,
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

export const getTableRows = async ({
  block_id,
  page_size = 10,
  start_cursor,
}: ListBlockChildrenParameters) => {
  const notion = getNotionClient();

  const table = await notion.blocks.retrieve({
    block_id,
  });

  if (!isFullBlock(table) || table.type !== "table") {
    throw new Error("Block is not a table");
  }

  const hasColumnHeader = table.table.has_column_header;

  const response = await notion.blocks.children.list({
    block_id,
    page_size: page_size + (hasColumnHeader ? 1 : 0), // Add 1 to page_size if table has column header
    start_cursor,
  });

  return response.results;
};

export const parseNftAddresses = (
  results: Awaited<ReturnType<typeof getTableRows>>
) => {
  const fullBlocks = results.filter(isFullBlock);
  const tableRows = fullBlocks.filter(
    (block): block is TableRowBlockObjectResponse => block.type === "table_row"
  );
  const addresses = tableRows.slice(1, tableRows.length - 1).map((tableRow) => {
    const cells = tableRow.table_row.cells;
    const address = cells[0][0].plain_text;

    return address;
  });

  return addresses;
};
