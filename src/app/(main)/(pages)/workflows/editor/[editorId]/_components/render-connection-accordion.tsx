'use client'
import React from 'react'
import { AccordionContent } from '@/components/ui/accordion'
import MultipleSelector from '@/components/ui/multiple-selector'
import { Connection } from '@/lib/types'
import { useNodeConnections } from '@/providers/connections-provider'
import { EditorState } from '@/providers/editor-provider'
import { SailthreadStore } from '@/store'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import ConnectionCardFlow from './connection-card'
import { createDropdownMenuScope } from '@radix-ui/react-dropdown-menu'


const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

const RenderConnectionAccordion = ({
  connection,
  state,
}: {
  connection: Connection
  state: EditorState
}) => {

  const {
    title,
    image,
    description,
    connectionKey,
    accessTokenKey,
    alwaysTrue,
    slackSpecial,
  } = connection

  const { nodeConnection } = useNodeConnections()
  const { slackChannels, selectedSlackChannels, setSelectedSlackChannels } = 
  SailthreadStore()

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const connectionData = (nodeConnection as any)[connectionKey]
console.log('Thisis the selected slack channels', selectedSlackChannels);
  const isConnected =
    alwaysTrue ||
    (nodeConnection[connectionKey] &&
      accessTokenKey &&
      connectionData[accessTokenKey!])

console.log('This is the connection title', title);


  return (
    <div key={title}>
      {state.editor.selectedNode.data.title === title?(
        <span>
          <ConnectionCardFlow
            title={title}
            icon={image}
            description={description}
            type={title}
            connected={{ [title]: isConnected }}

          />
        </span>
      ):""}


      
    </div>
  )

}


export default RenderConnectionAccordion