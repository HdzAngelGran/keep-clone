import { createContext, useReducer } from 'react'
import { todoReducer, todoInitialState } from '../reducers/todo'

export const TodoContext = createContext()

function useTodoReducer() {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState)

  const addItem = () => {
    dispatch({ type: 'ADD_ITEM' })
  }

  const editItem = (itemId, attribute, value) => {
    dispatch({ type: 'EDIT_ITEM', payload: { itemId, attribute, value } })
  }

  const deleteItem = (itemId) => {
    dispatch({ type: 'DELETE_ITEM', payload: itemId })
  }

  const addSubItem = (itemId) => {
    dispatch({ type: 'ADD_SUB_ITEM', payload: { itemId } })
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
    dispatch({ type: 'ADD_COMMENT', payload: { itemId } })
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
