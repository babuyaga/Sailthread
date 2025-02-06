import { AccordionContent } from '@/components/ui/accordion'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import GoogleFileDetails from '../google-file-details'
import GoogleDriveFiles from '../google-drive-files'

type Props = {
  file: any
  setFile: (file: any) => void
}

const GoogleDriveContent = ({ file, setFile }: Props) => {
  useEffect(() => {
    const reqGoogle = async () => {
      const response = await axios.get('/api/drive')
      if (response) {
        toast.message("Fetched File")
        setFile(response.data.message.files[0])
      } else {
        toast.error('Something went wrong')
      }
    }
    reqGoogle()
  }, [setFile])

  return (
    <AccordionContent>
      {/* Google Drive specific content */}
    </AccordionContent>
  )
}

export default GoogleDriveContent 