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

  return {
    state,
    initList,
    addItem,
    editItem,
    deleteItem,
    addSubItem,
    editSubItem,
    deleteSubItem,
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
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
