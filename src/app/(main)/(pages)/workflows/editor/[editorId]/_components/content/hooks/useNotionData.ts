import { useState, useEffect } from 'react'
import { NotionState } from '../types'
import { getNotionPages, getNotionDatabases } from '@/app/(main)/(pages)/connections/_actions/notion-connection'

export const useNotionData = (accessToken: string | null) => {
  const [state, setState] = useState<NotionState>({
    pages: [],
    tables: [],
    selectedPage: '',
    selectedTable: '',
    actionType: 'page'
  })

  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPages = async () => {
      if (!accessToken) return
      
      setIsLoading(true)
      try {
        const pages = await getNotionPages(accessToken)
        setState(prev => ({ ...prev, pages }))
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPages()
  }, [accessToken])

  useEffect(() => {
    const fetchTables = async () => {
      if (!accessToken || !state.selectedPage) return
      
      setIsLoading(true)
      try {
        const tables = await getNotionDatabases(accessToken, state.selectedPage)
        setState(prev => ({ ...prev, tables }))
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTables()
  }, [accessToken, state.selectedPage])

  return { state, setState, error, isLoading }
} 