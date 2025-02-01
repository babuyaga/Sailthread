'use client'

import { EditorActions, EditorNodeEdge, EditorNodeType } from '@/lib/types'
import {
  Dispatch,
  createContext,
  useContext,
  useReducer,
} from 'react'

// export type EditorNode = EditorNodeType

export type Editor = {
  elements: EditorNodeType[]
  edges: EditorNodeEdge[]
  selectedNode: EditorNodeType
}  //The editor elements is the list of nodes in the editor, edges are a list of connections between nodes, selectedNode is the node that is currently selected.

export type HistoryState = {
  history: Editor[]
  currentIndex: number
} //historystate holds "versions" of editors. Each change adds a new version to the history state.

export type EditorState = {
  editor: Editor
  history: HistoryState
} //combines the editor and it's history into a single state object

const initialEditorState: EditorState['editor'] = {
  elements: [],
   edges: [],
  selectedNode: {
    id: '',
    position: { x: 0, y: 0 },
    type: 'Trigger',
    data: {
      completed: false,
      current: false,
      description: '',
      metadata: {},
      title: '',
      type: 'Trigger',
    },
  },
 
}

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
}

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
}

const editorReducer = (
  state: EditorState = initialState,
  action: EditorActions
): EditorState => {

  
  switch (action.type) {

    case 'UNDO':
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1
        const prevEditorState = { ...state.history.history[prevIndex] }
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        }
        return undoState
      }
      return state


    case 'REDO':
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1
        const nextEditorState = { ...state.history.history[nextIndex] }
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        }
        return redoState
      }
      return state

    case 'LOAD_DATA':
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: action.payload.elements || initialEditorState.elements,
          edges: action.payload.edges,
        },
      }
    case 'SELECTED_ELEMENT':
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedNode: action.payload.element,
        },
      }
    default:
      return state
  }
}

export type EditorContextData = {
  previewMode: boolean
  setPreviewMode: (previewMode: boolean) => void
}

export const EditorContext = createContext<{state: EditorState;dispatch: Dispatch<EditorActions>}>(
  {
  state: initialState,
  dispatch: () => undefined,
}
)

type EditorProps = {
  children: React.ReactNode
}

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor Hook must be used within the editor Provider')
  }
  return context
}

export default EditorProvider