import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"


type Props = {}


const TemplateForm =  JSON.stringify({
    questions: [
      {
        id: "1",
        type: "dropdown",
        subtype: "",
        label: "What do you want this automation to achieve?",
        options: ["Comment", "Follow", "Interact with user"],
      },
      {
        id: "2",
        type: "input",
        subtype: "",
        label: "What is the content that you want?",
        options: ["Autopopulate from previous node", "Custom message"],

      },
    ],
  })



const SideBarTemplateForm = (props: Props) => {
  return (
    <ScrollArea className="h-80 rounded-md border p-4 text-black">
      Jokester began sneaking into the castle in the middle of the night and leaving
      jokes all over the place: under the king&apos;s pillow, in his soup, even in the
      royal toilet. The king was furious, but he couldn&apos;t seem to stop Jokester. And
      then, one day, the people of the kingdom discovered that the jokes left by
      Jokester were so funny that they couldn&apos;t help but laugh. And once they
      started laughing, they couldn&apos;t stop.
      Jokester began sneaking into the castle in the middle of the night and leaving
      jokes all over the place: under the king&apos;s pillow, in his soup, even in the
      royal toilet. The king was furious, but he couldn&apos;t seem to stop Jokester. And
      then, one day, the people of the kingdom discovered that the jokes left by
      Jokester were so funny that they couldn&apos;t help but laugh. And once they
      started laughing, they couldn&apos;t stop.
      Jokester began sneaking into the castle in the middle of the night and leaving
      jokes all over the place: under the king&apos;s pillow, in his soup, even in the
      royal toilet. The king was furious, but he couldn&apos;t seem to stop Jokester. And
      then, one day, the people of the kingdom discovered that the jokes left by
      Jokester were so funny that they couldn&apos;t help but laugh. And once they
      started laughing, they couldn&apos;t stop.
      Jokester began sneaking into the castle in the middle of the night and leaving
      jokes all over the place: under the king&apos;s pillow, in his soup, even in the
      royal toilet. The king was furious, but he couldn&apos;t seem to stop Jokester. And
      then, one day, the people of the kingdom discovered that the jokes left by
      Jokester were so funny that they couldn&apos;t help but laugh. And once they
      started laughing, they couldn&apos;t stop.
    </ScrollArea>
  )
}



export default SideBarTemplateForm