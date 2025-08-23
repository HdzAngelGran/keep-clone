import { Item } from '../types'
import { ACTION } from '../const'

export const todoInitialState: Item[] = JSON.parse(
  localStorage.getItem('list') || '[]',
)

export const updateLocalStorage = (state: Item[]) => {
  localStorage.setItem('list', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
  [ACTION.INIT_LIST]: (_state: Item[], action: any) => {
    const { list } = action.payload
    updateLocalStorage(list)
    return list
  },
  [ACTION.ADD_ITEM]: (state: Item[], action: any) => {
    const { linkedItem } = action.payload
    const newItem = {
      id: crypto.randomUUID(),
      completed: false,
      text: '',
      linkedItem,
    }
    const newState = [...state, newItem]
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.EDIT_ITEM]: (state: Item[], action: any) => {
    const { itemId, value } = action.payload
    const isStatus = typeof value === 'boolean'
    const newState = state.map((item) =>
      item.id === itemId
        ? { ...item, [isStatus ? 'completed' : 'text']: value }
        : item,
    )
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.DELETE_ITEM]: (state: Item[], action: any) => {
    const newState = state.filter((item) => item.id !== action.payload)
    updateLocalStorage(newState)
    return newState
  },
}

export const todoReducer = (state: Item[], action: any) => {
  const updateState = UPDATE_STATE_BY_ACTION[action.type]
  return updateState ? updateState(state, action) : state
}
