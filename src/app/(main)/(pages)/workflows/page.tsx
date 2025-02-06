import React from 'react'
import WorkflowButton from './_components/workflow-button'
import Workflows from './_components'

type Props = {}

const WorkflowPage = (props: Props) => {
  return (
    <div className="flex flex-col relative">
      <div className="mt-5 sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-1.5 pl-6 text-3xl backdrop-blur-lg">
      <div className="flex gap-10  my-auto flex-row justify-center">
        <span className="">Workflows</span>
        <WorkflowButton />
        </div>
    </div>
      
      <Workflows />
    </div>
  )
}

export default WorkflowPage