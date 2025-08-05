import { Item } from '../types'
import { ACTION } from '../const'

import { updateItemStatus, updateItemText, deleteItem } from '../service/item'
import {
  deleteSubItem,
  updateSubItemStatus,
  updateSubItemText,
} from '../service/subitem'

export const todoInitialState: Item[] = JSON.parse(
  localStorage.getItem('list') || '[]',
)

export const updateLocalStorage = (state: Item[]) => {
  localStorage.setItem('list', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
  [ACTION.INIT_LIST]: (state: Item[], action: any) => {
    const { list } = action.payload
    updateLocalStorage(list)
    return list
  },
  [ACTION.ADD_ITEM]: (state: Item[], action: any) => {
    let newItemId = action.payload
    const newItem = {
      id: newItemId,
      completed: false,
      text: '',
      subItems: [],
    }
    const newState = [...state, newItem]
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.EDIT_ITEM]: (state: Item[], action: any) => {
    const { itemId, value } = action.payload
    const isStatus = typeof value === 'boolean'
    isStatus ? updateItemStatus(itemId, value) : updateItemText(itemId, value)
    const newState = state.map((item) =>
      item.id === itemId
        ? { ...item, [isStatus ? 'completed' : 'text']: value }
        : item,
    )
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.DELETE_ITEM]: (state: Item[], action: any) => {
    deleteItem(action.payload)
    const newState = state.filter((item) => item.id !== action.payload)
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.ADD_SUB_ITEM]: (state: Item[], action: any) => {
    const { itemId, newSubItemId } = action.payload
    updateItemStatus(itemId, false)
    const newSubItem = {
      id: newSubItemId,
      completed: false,
      text: '',
    }
    const newState: Item[] = state.map((item) =>
      item.id === itemId
        ? {
            ...item,
            completed: false,
            subItems: [...(item.subItems || []), newSubItem],
          }
        : item,
    )
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.EDIT_SUB_ITEM]: (state: Item[], action: any) => {
    const { itemId, subItemId, value } = action.payload
    const isStatus = typeof value === 'boolean'
    if (isStatus) {
      updateSubItemStatus(itemId, subItemId, value)
      if (!value) updateItemStatus(itemId, false)
    } else updateSubItemText(itemId, subItemId, value)

    const newState = state.map((item) => {
      if (item.id === itemId) {
        const updatedSubItems = item.subItems?.map((subItem) =>
          subItem.id === subItemId
            ? { ...subItem, [isStatus ? 'completed' : 'text']: value }
            : subItem,
        )
        return {
          ...item,
          completed: isStatus && !value ? false : item.completed,
          subItems: updatedSubItems,
        }
      }
      return item
    })
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.DELETE_SUB_ITEM]: (state: Item[], action: any) => {
    const { itemId, subItemId } = action.payload
    deleteSubItem(itemId, subItemId)
    const newState = state.map((item) => {
      if (item.id === itemId) {
        const updatedSubItems = item.subItems?.filter(
          (subItem) => subItem.id !== subItemId,
        )
        return { ...item, subItems: updatedSubItems }
      }
      return item
    })
    updateLocalStorage(newState)
    return newState
  },
}

export const todoReducer = (state: Item[], action: any) => {
  const updateState = UPDATE_STATE_BY_ACTION[action.type]
  return updateState ? updateState(state, action) : state
}
