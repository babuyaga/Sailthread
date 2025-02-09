'use server'
import { Option } from '@/components/ui/multiple-selector'
import { db } from '@/lib/db'
import { auth, currentUser} from '@clerk/nextjs/server'
import { NodeTemplate } from '@prisma/client'

export const getGoogleListener = async () => {
  const { userId } = await auth()

  if (userId) {
    const listener = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        googleResourceId: true,
      },
    })

    if (listener) return listener
  }
}

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  console.log(state)
  const published = await db.workflows.update({
    where: {
      id: workflowId,
    },
    data: {
      publish: state,
    },
  })

  if (published.publish) return 'Workflow published'
  return 'Workflow unpublished'
}

export const onCreateNodeTemplate = async (
  content: string,
  type: string,
  workflowId: string,
  nodeId:string,
  channels?: Option[],
  accessToken?: string,
  notionDbId?: string,
  notionPageId?: string,
  notionTableId?: string,
  notionActionType?: string, 
) => {

  if (type === 'Discord') {
    const response = await db.nodeTemplate.update({
      where: {
        nodeId: nodeId,
      },
      data: {
        content: content,
      },
    })

    if (response) {
      return 'Discord template saved'
    }
  }




  if (type === 'Slack') {
    const response = await db.nodeTemplate.update({
      where: {
        nodeId: nodeId,
      },
      data: {
    content:content,
      },

    })

  if (response) {
      const channelList = await db.nodeTemplate.findUnique({
        where: {
          nodeId: nodeId,
        },
        select: {
          slackChannels: true,
        },

      })

      if (channelList) {
        //remove duplicates before insert
        const NonDuplicated = channelList.slackChannels.filter(
          (channel) => channel !== channels![0].value
        )

        NonDuplicated!
          .map((channel) => channel)
          .forEach(async (channel) => {
            await db.nodeTemplate.update({
              where: {
                nodeId: nodeId,
              },
              data: {
                slackChannels: {
                  push: channel,
                },
              },

            })
          })

        return 'Slack template saved'
      }
      channels!
        .map((channel) => channel.value)
        .forEach(async (channel) => {
          await db.nodeTemplate.update({
            where: {
              nodeId: nodeId,
            },
            data: {
              slackChannels: {
                push: channel,
              },
            },

          })
        })
      return 'Slack template saved'
    }
  }



  if (type === 'Notion') {
    const response = await db.nodeTemplate.update({
      where: {
        nodeId: nodeId,
      },
      data: {
        content: content,
        notionDbId: notionDbId,
        notionPageId: notionPageId,
        notionTableId: notionTableId,
        notionActionType: notionActionType,
      },

    })

    if (response) return 'Notion template saved'
  }



}



export const onGetWorkflows = async () => {
  const user = await currentUser()
  if (user) {
    const workflow = await db.workflows.findMany({
      where: {
        userId: user.id,
      },
    })

    if (workflow) return workflow
  }
}

export const onCreateWorkflow = async (name: string, description: string) => {
  const user = await currentUser()

  if (user) {
    //create new workflow
    const workflow = await db.workflows.create({
      data: {
        userId: user.id,
        name,
        description,
      },
    })

    if (workflow) return { message: 'workflow created' }
    return { message: 'Oops! try again' }
  }
}

export const onGetNodesEdges = async (flowId: string) => {
  const nodesEdges = await db.workflows.findUnique({
    where: {
      id: flowId,
    },
    select: {
      nodes: true,
      edges: true,
    },
  })
  if (nodesEdges?.nodes && nodesEdges?.edges) return nodesEdges
}


export const addToNodeTemplate = async (nodeTemplate?: NodeTemplate) => {
  const response = await db.nodeTemplate.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440000",
      nodeId: "node-12345",
      type: "Instagram",
      content: "{\"questions\":[{\"id\":\"1\",\"type\":\"dropdown\",\"label\":\"What do you want this automation to achieve?\",\"options\":[\"Comment\",\"Follow\",\"Interact with user\"]},{\"id\":\"2\",\"type\":\"input\",\"label\":\"What is the content that you want?\",\"options\":[\"Autopopulate from previous node\",\"Custom message\"]}]}",
      createdAt: new Date("2023-10-01T12:00:00Z"),
      updatedAt: new Date("2023-10-01T12:00:00Z"),
      slackChannels: ["general", "automation"],
      notionDbId: "12345678-1234-1234-1234-123456789012",
      notionTableId: "87654321-4321-4321-4321-210987654321",
      notionPageId: "11223344-5566-7788-9900-aabbccddeeff",
      notionTableName: "Automation Logs",
      notionPageName: "Instagram Automation",
      notionActionType: "Create Entry",
      accessToken: "slack-access-token-12345",
      workflowId: "1dd273ee-6e5f-46ac-90ce-3691c2f82dde",
      userId: "user_2sYk69c4cRnUQNT1Xi4TkU4goVV",
  },
  })
  return response
}

