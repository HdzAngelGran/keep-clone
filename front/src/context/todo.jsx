import { createContext, useReducer } from 'react'
import { todoReducer, todoInitialState } from '../reducers/todo'

import axios from 'axios'

const SERVICE_URL = 'http://localhost:8080/api/v1/item'

const pendingRequests = new Map()

export const TodoContext = createContext()

function useTodoReducer() {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState)

  const addItem = () => {
    const requestKey = `${SERVICE_URL}`
    if (pendingRequests.has(requestKey)) return

    const request = axios
      .post(SERVICE_URL)
      .then((res) => {
        dispatch({ type: 'ADD_ITEM', payload: res.data.newItemId })
        pendingRequests.delete(requestKey)
      })
      .catch((error) => {
        console.error(error)
        pendingRequests.delete(requestKey)
      })
    pendingRequests.set(requestKey, request)
  }

  const editItem = (itemId, attribute, value) => {
    dispatch({ type: 'EDIT_ITEM', payload: { itemId, attribute, value } })
  }

  const deleteItem = (itemId) => {
    dispatch({ type: 'DELETE_ITEM', payload: itemId })
  }

  const addSubItem = (itemId) => {
    const requestKey = `${SERVICE_URL}/${itemId}/sub-item`
    if (pendingRequests.has(requestKey)) return

    const request = axios
      .post(`${SERVICE_URL}/${itemId}/sub-item`)
      .then((res) => {
        dispatch({
          type: 'ADD_SUB_ITEM',
          payload: { itemId, newSubItemId: res.data.newSubItemId },
        })
        pendingRequests.delete(requestKey)
      })
      .catch((error) => {
        console.error(error)
        pendingRequests.delete(requestKey)
      })
    pendingRequests.set(requestKey, request)
  }

  const editSubItem = (itemId, subItemId, attribute, value) => {
    dispatch({
      type: 'EDIT_SUB_ITEM',
      payload: { itemId, subItemId, attribute, value },
    })
  }

  const deleteSubItem = (itemId, subItemId) => {
    dispatch({ type: 'DELETE_SUB_ITEM', payload: { itemId, subItemId } })
  }

  const addComment = (itemId) => {
    const url = `${SERVICE_URL}/${itemId}/comment`
    const requestKey = url
    if (pendingRequests.has(requestKey)) return
    const request = axios
      .post(url)
      .then((res) => {
        dispatch({
          type: 'ADD_COMMENT',
          payload: { itemId, newCommentId: res.data.newCommentId },
        })
        pendingRequests.delete(requestKey)
      })
      .catch((error) => {
        console.error(error)
        pendingRequests.delete(requestKey)
      })
    pendingRequests.set(requestKey, request)
  }

  const editComment = (itemId, commentId, value) => {
    dispatch({ type: 'EDIT_COMMENT', payload: { itemId, commentId, value } })
  }

  const deleteComment = (itemId, commentId) => {
    dispatch({ type: 'DELETE_COMMENT', payload: { itemId, commentId } })
  }

  const addSubComment = (itemId, subItemId) => {
    dispatch({ type: 'ADD_SUB_COMMENT', payload: { itemId, subItemId } })
  }

  const editSubComment = (itemId, subItemId, commentId, value) => {
    dispatch({
      type: 'EDIT_SUB_COMMENT',
      payload: { itemId, subItemId, commentId, value },
    })
  }

  const deleteSubComment = (itemId, subItemId, commentId) => {
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

export function TodoProvider({ children }) {
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
