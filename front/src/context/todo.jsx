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

  return {
    state,
    addItem,
    editItem,
    deleteItem,
    addSubItem,
    editSubItem,
    deleteSubItem,
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
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
