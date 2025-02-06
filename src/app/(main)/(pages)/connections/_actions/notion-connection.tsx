'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { Client } from '@notionhq/client'

export const onNotionConnect = async (
  access_token: string,
  workspace_id: string,
  workspace_icon: string,
  workspace_name: string,
  database_id: string,
  id: string
) => {
  'use server'
  if (access_token) {
    //check if notion is connected
    const notion_connected = await db.notion.findFirst({
      where: {
        accessToken: access_token,
      },
      include: {
        connections: {
          select: {
            type: true,
          },
        },
      },
    })

    if (!notion_connected) {
      //create connection
      await db.notion.create({
        data: {
          userId: id,
          workspaceIcon: workspace_icon!,
          accessToken: access_token,
          workspaceId: workspace_id!,
          workspaceName: workspace_name!,
          databaseId: database_id,
          connections: {
            create: {
              userId: id,
              type: 'Notion',
            },
          },
        },
      })
    }
  }
}
export const getNotionConnection = async () => {
  const user = await currentUser()
  if (user) {
    const connection = await db.notion.findFirst({
      where: {
        userId: user.id,
      },
    })
    if (connection) {
      return connection
    }
  }
}

export const getNotionDatabase = async (
  databaseId: string,
  accessToken: string
) => {
  const notion = new Client({
    auth: accessToken,
  })
  const response = await notion.databases.retrieve({ database_id: databaseId })
  return response
}

export const onCreateNewPageInDatabase = async (
  databaseId: string,
  accessToken: string,
  content: string
) => {
  const notion = new Client({
    auth: accessToken,
  })

  console.log(databaseId)
  const response = await notion.pages.create({
    parent: {
      type: 'database_id',
      database_id: databaseId,
    },
    properties: {
      name: [
        {
          text: {
            content: content,
          },
        },
      ],
    },
  })
  if (response) {
    return response
  }
}

export const getNotionPages = async (accessToken: string) => {
  const notion = new Client({
    auth: accessToken,
  })
  
  const response = await notion.search({
    filter: {
      value: 'page',
      property: 'object',
    },
  })
  
  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties?.title?.title?.[0]?.plain_text || 'Untitled',
  }))
}

export const getNotionDatabases = async (accessToken: string, pageId: string) => {
  const notion = new Client({
    auth: accessToken,
  })
  
  const response = await notion.search({
    filter: {
      value: 'database',
      property: 'object',
    },
    page_size: 100,
  })
  
  return response.results.map((database: any) => ({
    id: database.id,
    title: database.title?.[0]?.plain_text || 'Untitled',
    properties: database.properties,
  }))
}

export const addRowToNotionTable = async (
  databaseId: string,
  accessToken: string,
  properties: Record<string, any>
) => {
  const notion = new Client({
    auth: accessToken,
  })

  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties,
  })

  return response
}