import React from 'react'
import Workflow from './workflow'
// import { onGetWorkflows } from '../_actions/workflow-connections'
// import MoreCredits from './more-creadits'

type Props = {}

const Workflows = async (props: Props) => {
//   const workflows = await onGetWorkflows()
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col m-2 gap-5 pt-10">
        {/* <MoreCredits /> */}
        {/* {workflows?.length ? (
          workflows.map((flow) => (
            <Workflow
              key={flow.id}
              {...flow}
            />
          ))
        ) : (
          <div className="mt-28 flex text-muted-foreground items-center justify-center">
            No Workflows
          </div>
        )} */}
        <Workflow
              key="safsafasdfasdf123"
              id="1324214123412sdf"
              name="Automation Workflow"
              publish={true}
            />
              <Workflow
              key="safsafasdfasdf123"
              id="1324214123412sdf"
              name="Automation Workflow"
              publish={true}
            />
              <Workflow
              key="safsafasdfasdf123"
              id="1324214123412sdf"
              name="Automation Workflow"
              publish={true}
            />
              <Workflow
              key="safsafasdfasdf123"
              id="1324214123412sdf"
              name="Automation Workflow"
              publish={true}
            />
              <Workflow
              key="safsafasdfasdf123"
              id="1324214123412sdf"
              name="Automation Workflow"
              publish={true}
            />
              <Workflow
              key="safsafasdfasdf123"
              id="1324214123412sdf"
              name="Automation Workflow"
              publish={true}
            />
              <Workflow
              key="safsafasdfasdf123"
              id="1324214123412sdf"
              name="Automation Workflow"
              publish={true}
            />
              <Workflow
              key="safsafasdfasdf123"
              id="1324214123412sdf"
              name="Automation Workflow"
              publish={true}
            />
      </section>
    </div>
  )
}

export default Workflows