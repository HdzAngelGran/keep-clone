import { createContext, ReactElement, useReducer } from 'react'
import { todoReducer, todoInitialState } from '../reducers/todo'

import axios from 'axios'
import { TodoContextType } from '../types'

const SERVICE_URL = 'http://localhost:8080/api/v1/item'

const pendingRequests = new Map()

export const TodoContext = createContext<TodoContextType>({
  list: todoInitialState,
  addItem: () => {},
  editItem: (
    _itemId: string,
    _attribute: string,
    _value: string | boolean,
  ) => {},
  deleteItem: (_itemId: string) => {},
  addSubItem: (_itemId: string) => {},
  editSubItem: (
    _itemId: string,
    _subItemId: string,
    _attribute: string,
    _value: string | boolean,
  ) => {},
  deleteSubItem: (_itemId: string, _subItemId: string) => {},
  addComment: (_itemId: string) => {},
  editComment: (_itemId: string, _commentId: string, _value: string) => {},
  deleteComment: (_itemId: string, _commentId: string) => {},
  addSubComment: (_itemId: string, _subItemId: string) => {},
  editSubComment: (
    _itemId: string,
    _subItemId: string,
    _commentId: string,
    _value: string,
  ) => {},
  deleteSubComment: (
    _itemId: string,
    _subItemId: string,
    _commentId: string,
  ) => {},
})

function useTodoReducer() {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState)

  const addItem = () => {
    const requestKey = `${SERVICE_URL}`
    if (pendingRequests.has(requestKey)) return

    const request = axios
      .post(SERVICE_URL)
      .then((res) => {
        const data = res.data as { newItemId: string }
        dispatch({ type: 'ADD_ITEM', payload: data.newItemId })
        pendingRequests.delete(requestKey)
      })
      .catch((error) => {
        console.error(error)
        pendingRequests.delete(requestKey)
      })
    pendingRequests.set(requestKey, request)
  }

  const editItem = (
    itemId: string,
    attribute: string,
    value: string | boolean,
  ) => {
    dispatch({ type: 'EDIT_ITEM', payload: { itemId, attribute, value } })
  }

  const deleteItem = (itemId: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: itemId })
  }

  const addSubItem = (itemId: string) => {
    const requestKey = `${SERVICE_URL}/${itemId}/sub-item`
    if (pendingRequests.has(requestKey)) return

    const request = axios
      .post(`${SERVICE_URL}/${itemId}/sub-item`)
      .then((res) => {
        const data = res.data as { newSubItemId: string }
        dispatch({
          type: 'ADD_SUB_ITEM',
          payload: { itemId, newSubItemId: data.newSubItemId },
        })
        pendingRequests.delete(requestKey)
      })
      .catch((error) => {
        console.error(error)
        pendingRequests.delete(requestKey)
      })
    pendingRequests.set(requestKey, request)
  }

  const editSubItem = (
    itemId: string,
    subItemId: string,
    attribute: string,
    value: string | boolean,
  ) => {
    dispatch({
      type: 'EDIT_SUB_ITEM',
      payload: { itemId, subItemId, attribute, value },
    })
  }

  const deleteSubItem = (itemId: string, subItemId: string) => {
    dispatch({ type: 'DELETE_SUB_ITEM', payload: { itemId, subItemId } })
  }

  const addComment = (itemId: string): void => {
    const url = `${SERVICE_URL}/${itemId}/comment`
    const requestKey = url
    if (pendingRequests.has(requestKey)) return
    const request = axios
      .post(url)
      .then((res) => {
        const data = res.data as { newCommentId: string }
        dispatch({
          type: 'ADD_COMMENT',
          payload: { itemId, newCommentId: data.newCommentId },
        })
        pendingRequests.delete(requestKey)
      })
      .catch((error) => {
        console.error(error)
        pendingRequests.delete(requestKey)
      })
    pendingRequests.set(requestKey, request)
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
