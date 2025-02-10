'use client'
import { EditorCanvasTypes, EditorNodeType } from '@/lib/types'
import { useNodeConnections } from '@/providers/connections-provider'
import { useEditor } from '@/providers/editor-provider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { CONNECTIONSNODE, EditorCanvasDefaultCardTypes } from '@/lib/constants'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  fetchBotSlackChannels,
  onConnections,
  onDragStart,
} from '@/lib/editor-utils'
import EditorCanvasIconHelper from './editor-canvas-card-icon-helper'
import {
  Accordion,
  AccordionItem,
} from '@/components/ui/accordion'
import RenderConnectionAccordion from './render-connection-accordion'

import { SailthreadStore } from '@/store'
import { Toaster } from "@/components/ui/sonner"
import { cn } from '@/lib/utils'
import SideBarTemplateForm from './sidebar-template-form'


type Props = {
  nodes: EditorNodeType[]
}

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor()
  const { nodeConnection } = useNodeConnections()
  const { googleFile, setSlackChannels } = SailthreadStore()
  const [activeTab, setActiveTab] = useState<string>('actions')

  useEffect(() => {
    if (state) {
      onConnections(nodeConnection, state, googleFile)
    }
  }, [state])

  useEffect(() => {
    if (nodeConnection.slackNode.slackAccessToken) {
      fetchBotSlackChannels(
        nodeConnection.slackNode.slackAccessToken,
        setSlackChannels
      )
    }
  }, [nodeConnection, setSlackChannels])

  useEffect(() => {
    if (state.editor.selectedNode.id) {
      setActiveTab('configurations')
    } else {
      setActiveTab('actions')
    }
  }, [state.editor.selectedNode.id])


  return (
    <aside>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="h-screen overflow-scroll pb-24 p-4"
      >
        <Toaster />
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="configurations" className={cn(!state.editor.selectedNode.id && "hidden")}>Configurations</TabsTrigger>

        </TabsList>
        <Separator />
       
       
       
       
       
        <TabsContent  //tab for the cards
          value="actions"
          className={cn("flex flex-col gap-4 pb-24", activeTab === 'configurations' && "hidden")}
        >
          {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>{
               
                return (!nodes.length && cardType.type === 'Trigger') ||
                (nodes.length && cardType.type === 'Action')
})
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) =>
                  onDragStart(event, cardKey as EditorCanvasTypes)
                }
              >
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                  <CardTitle className="text-md">
                    {cardKey}
                    
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>




        <TabsContent //tab for settings
          value="configurations"
          className="px-2 gap-2 flex flex-col"
        >
<span>
          {CONNECTIONSNODE.map((connection) => (
                  <RenderConnectionAccordion
                    key={connection.title}
                    state={state}
                    connection={connection}
                  />
                ))}
</span>

            <SideBarTemplateForm />
         
        </TabsContent>
      </Tabs>
    </aside>
  )
}

export default EditorCanvasSidebar