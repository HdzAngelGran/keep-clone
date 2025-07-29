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

  return {
    state,
    addItem,
    editItem,
    deleteItem,
  }
}

export function TodoProvider({ children }) {
  const { state, addItem, editItem, deleteItem } = useTodoReducer()

  return (
    <TodoContext.Provider
      value={{
        list: state,
        addItem,
        editItem,
        deleteItem,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
