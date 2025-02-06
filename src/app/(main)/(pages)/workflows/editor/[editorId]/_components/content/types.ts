import { ConnectionProviderProps } from "@/lib/types"

export interface ContentProps {
  nodeConnection: ConnectionProviderProps
  file?: any
  setFile?: (file: any) => void
  selectedChannels?: Option[]
  setSelectedChannels?: (channels: Option[]) => void
}

export interface Option {
  value: string
  label: string
  disable?: boolean
  fixed?: boolean
  [key: string]: string | boolean | undefined
}

export interface NotionState {
  pages: any[]
  tables: any[]
  selectedPage: string
  selectedTable: string
  actionType: 'page' | 'table'
}

export interface GoogleDriveState {
  files: any[]
  selectedFile: any
  isLoading: boolean
  error: Error | null
} 