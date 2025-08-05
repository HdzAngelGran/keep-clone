import { createContext, ReactElement, useReducer } from 'react'
import { todoReducer, todoInitialState } from '../reducers/todo'
import { Item, TodoContextType } from '../types'

const pendingRequests = new Map()

export const TodoContext = createContext<TodoContextType>({
  list: todoInitialState,
  initList: () => {},
  addItem: (_itemId) => {},
  editItem: (_itemId, _value) => {},
  deleteItem: (_itemId) => {},
  addSubItem: (_itemId, _newSubItemId) => {},
  editSubItem: (_itemId, _subItemId, _value) => {},
  deleteSubItem: (_itemId, _subItemId) => {},
  addComment: (_itemId, _newCommentId) => {},
  editComment: (_itemId, _commentId, _value) => {},
  deleteComment: (_itemId, _commentId) => {},
  addSubComment: (_itemId, _subItemId) => {},
  editSubComment: (_itemId, _subItemId, _commentId, _value) => {},
  deleteSubComment: (_itemId, _subItemId, _commentId) => {},
})

function useTodoReducer() {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState)

  const initList = (list: Item[]) => {
    dispatch({ type: 'INIT_LIST', payload: { list } })
  }

  const addItem = (itemId: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { itemId } })
  }

  const editItem = (itemId: string, value: string | boolean) => {
    dispatch({ type: 'EDIT_ITEM', payload: { itemId, value } })
  }

  const deleteItem = (itemId: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: itemId })
  }

  const addSubItem = (itemId: string, newSubItemId: string) => {
    dispatch({
      type: 'ADD_SUB_ITEM',
      payload: { itemId, newSubItemId },
    })
  }

  const editSubItem = (
    itemId: string,
    subItemId: string,
    value: string | boolean,
  ) => {
    dispatch({
      type: 'EDIT_SUB_ITEM',
      payload: { itemId, subItemId, value },
    })
  }

  const deleteSubItem = (itemId: string, subItemId: string) => {
    dispatch({ type: 'DELETE_SUB_ITEM', payload: { itemId, subItemId } })
  }

  const addComment = (itemId: string, newCommentId: string): void => {
    dispatch({
      type: 'ADD_COMMENT',
      payload: { itemId, newCommentId },
    })
  }

  const editComment = (itemId: string, commentId: string, value: string) => {
    dispatch({ type: 'EDIT_COMMENT', payload: { itemId, commentId, value } })
  }

  const deleteComment = (itemId: string, commentId: string) => {
    dispatch({ type: 'DELETE_COMMENT', payload: { itemId, commentId } })
  }

  const addSubComment = (itemId: string, subItemId: string) => {
    dispatch({ type: 'ADD_SUB_COMMENT', payload: { itemId, subItemId } })
  }

  const editSubComment = (
    itemId: string,
    subItemId: string,
    commentId: string,
    value: string,
  ) => {
    dispatch({
      type: 'EDIT_SUB_COMMENT',
      payload: { itemId, subItemId, commentId, value },
    })
  }

  const deleteSubComment = (
    itemId: string,
    subItemId: string,
    commentId: string,
  ) => {
    dispatch({
      type: 'DELETE_SUB_COMMENT',
      payload: { itemId, subItemId, commentId },
    })
  }

  return {
    state,
    initList,
    addItem,
    editItem,
    deleteItem,
    addSubItem,
    editSubItem,
    deleteSubItem,
    addComment,
    editComment,
    deleteComment,
    addSubComment,
    editSubComment,
    deleteSubComment,
  }
}

export function TodoProvider({ children }: any): ReactElement {
  const {
    state,
    initList,
    addItem,
    editItem,
    deleteItem,
    addSubItem,
    editSubItem,
    deleteSubItem,
    addComment,
    editComment,
    deleteComment,
    addSubComment,
    editSubComment,
    deleteSubComment,
  } = useTodoReducer()

  return (
    <TodoContext.Provider
      value={{
        list: state,
        initList,
        addItem,
        editItem,
        deleteItem,
        addSubItem,
        editSubItem,
        deleteSubItem,
        addComment,
        editComment,
        deleteComment,
        addSubComment,
        editSubComment,
        deleteSubComment,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
