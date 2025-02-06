import { AccordionContent } from '@/components/ui/accordion'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ContentProps } from './types'
import { useNotionData } from './hooks/useNotionData'
import { ContentErrorBoundary } from './error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const NotionContent = ({ nodeConnection }: ContentProps) => {
  const { state, setState, error, isLoading } = useNotionData(
    nodeConnection.notionNode.accessToken
  )

  if (error) throw error

  return (
    <ContentErrorBoundary>
      <AccordionContent>
        <Card>
          <CardHeader>
            <CardTitle>Notion Settings</CardTitle>
          </CardHeader>
          <div className="flex flex-col gap-4 p-6">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Select 
                  onValueChange={value => setState(prev => ({ ...prev, actionType: value as 'page' | 'table' }))} 
                  defaultValue={state.actionType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Create Page</SelectItem>
                    <SelectItem value="table">Add to Table</SelectItem>
                  </SelectContent>
                </Select>

                {state.actionType === 'table' && (
                  <>
                    <Select 
                      onValueChange={value => setState(prev => ({ ...prev, selectedPage: value }))}
                      value={state.selectedPage}
                    >
                      {/* Page selection UI */}
                    </Select>

                    {state.selectedPage && (
                      <Select 
                        onValueChange={value => setState(prev => ({ ...prev, selectedTable: value }))}
                        value={state.selectedTable}
                      >
                        {/* Table selection UI */}
                      </Select>
                    )}
                  </>
                )}

                <Input
                  type="text"
                  value={nodeConnection.notionNode.content}
                  onChange={(event) => onContentChange(nodeConnection, 'Notion', event)}
                  placeholder={state.actionType === 'page' ? 'Page content' : 'Row content (JSON)'}
                />
              </>
            )}
          </div>
        </Card>
      </AccordionContent>
    </ContentErrorBoundary>
  )
}

export default NotionContent 