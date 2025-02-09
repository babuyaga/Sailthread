'use client'
import { ConnectionProviderProps } from './types'
import { EditorCanvasCardType } from './types'
import { EditorState } from '@/providers/editor-provider'
import { getDiscordConnectionUrl } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
import {
  getNotionConnection,
  getNotionDatabase,
} from '@/app/(main)/(pages)/connections/_actions/notion-connection'
import {
  getSlackConnection,
  listBotChannels,
} from '@/app/(main)/(pages)/connections/_actions/slack-connection'
import { Option } from '@/components/ui/multiple-selector'

// Handles the drag start event for a node in the editor canvas
export const onDragStart = (
  event: any,
  nodeType: EditorCanvasCardType['type']
) => {
  console.log(event);
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}

// Updates the content of the Slack node when the input changes
export const onSlackContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setSlackNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }))
}

// Updates the content of the Discord node when the input changes
export const onDiscordContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setDiscordNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }))
}


// Adds a template to the content of the Slack node
export const onAddTemplateSlack = (
  nodeConnection: ConnectionProviderProps,
  template: string
) => {
  nodeConnection.setSlackNode((prev: any) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }))
}

// Adds a template to the content of the Discord node
export const onAddTemplateDiscord = (
  nodeConnection: ConnectionProviderProps,
  template: string
) => {
  nodeConnection.setDiscordNode((prev: any) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }))
}

// Adds a template to the content of the specified node type (Slack or Discord)
export const onAddTemplate = (
  nodeConnection: ConnectionProviderProps,
  title: string,
  template: string
) => {
  if (title === 'Slack') {
    onAddTemplateSlack(nodeConnection, template)
  } else if (title === 'Discord') {
    onAddTemplateDiscord(nodeConnection, template)
  }
}

// Handles the connection logic for different node types (Discord, Notion, Slack)
export const onConnections = async (
  nodeConnection: ConnectionProviderProps,
  editorState: EditorState,
  googleFile: any
) => {


  if (editorState.editor.selectedNode.data.title == 'Discord') {
    const connection = await getDiscordConnectionUrl() //checks if there's a row in Discord table with the users id
    if (connection) {
      nodeConnection.setDiscordNode({
        webhookURL: connection.url,

        content: '',
        webhookName: connection.name,
        guildName: connection.guildName,
      })
    }
  }



  if (editorState.editor.selectedNode.data.title == 'Notion') {
    const connection = await getNotionConnection() //checks if there's a row in Notion table with the users id

    if (connection) {
      nodeConnection.setNotionNode({
        accessToken: connection.accessToken,
        databaseId: connection.databaseId,
        workspaceName: connection.workspaceName,
        content: {
          name: googleFile.name,
          kind: googleFile.kind,
          type: googleFile.mimeType,
        },
      })

      if (nodeConnection.notionNode.databaseId !== '') {
        const response = await getNotionDatabase(
          nodeConnection.notionNode.databaseId,
          nodeConnection.notionNode.accessToken
        )
      }
    }
  }


  if (editorState.editor.selectedNode.data.title == 'Slack') {
    const connection = await getSlackConnection() //checks if there's a row in Slack table with the users id
    if (connection) {
      nodeConnection.setSlackNode({
        appId: connection.appId,
        authedUserId: connection.authedUserId,
        authedUserToken: connection.authedUserToken,
        slackAccessToken: connection.slackAccessToken,
        botUserId: connection.botUserId,

        teamId: connection.teamId,
        teamName: connection.teamName,
        userId: connection.userId,
        content: '',
      })
    }
  }


}

// Fetches the list of Slack channels for a bot using the provided token
export const fetchBotSlackChannels = async (
  token: string,
  setSlackChannels: (slackChannels: Option[]) => void
) => {
  await listBotChannels(token)?.then((channels) => setSlackChannels(channels))
}

// Updates the content of the Notion node when the input changes
export const onNotionContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setNotionNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }))
}





// Handles content changes for different node types (Slack, Discord, Notion)
export const onContentChange = (
  nodeConnection: ConnectionProviderProps,
  nodeType: string,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  if (nodeType === 'Slack') {
    onSlackContent(nodeConnection, event)
  } else if (nodeType === 'Discord') {
    onDiscordContent(nodeConnection, event)
  } else if (nodeType === 'Notion') {
    onNotionContent(nodeConnection, event)
  }
}