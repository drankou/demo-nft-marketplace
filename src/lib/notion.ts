import { Client, isFullBlock } from '@notionhq/client'
import {
  BlockObjectResponse,
  ListBlockChildrenParameters,
  PartialBlockObjectResponse,
  TableRowBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

let notionClient: Client

export const getNotionClient = () => {
  if (!notionClient) {
    if (!process.env.NOTION_TOKEN) {
      throw new Error('NOTION_TOKEN is not defined')
    }

    notionClient = new Client({
      auth: process.env.NOTION_TOKEN,
    })
  }

  return notionClient
}

export const getTableBlocks = async ({
  block_id,
  page_size = 10,
  start_cursor,
  ignoreHeader,
}: ListBlockChildrenParameters & {
  ignoreHeader?: boolean
}) => {
  const notion = getNotionClient()

  const response = await notion.blocks.children.list({
    block_id,
    page_size: page_size + (ignoreHeader ? 1 : 0), // Add 1 to page_size if table has column header
    start_cursor,
  })

  return response
}

export const parseNftAddresses = (
  results: (PartialBlockObjectResponse | BlockObjectResponse)[]
) => {
  const fullBlocks = results.filter(isFullBlock)
  const tableRows = fullBlocks.filter(
    (block): block is TableRowBlockObjectResponse => block.type === 'table_row'
  )
  const addresses = tableRows
    .map((tableRow) => {
      const cells = tableRow.table_row.cells

      // Skip empty rows
      if (!cells[0][0]) {
        return null
      }

      const address = cells[0][0].plain_text

      // User-friendly address should contain strictly 48 characters
      if (address.length !== 48) {
        return null
      }

      return address
    })
    .filter(Boolean) as string[]

  return addresses
}
