import {Item} from '../types'

import {
  updateItemStatus,
  updateItemText,
  deleteItem,
  updateComment,
  deleteComment,
} from '../service/item'
import {
  deleteSubItem,
  updateSubItemStatus,
  updateSubItemText,
} from '../service/subitem'

export const todoInitialState: Item[] = JSON.parse(localStorage.getItem('list') || "[]")

export const ACTION = {
  INIT_LIST: 'INIT_LIST',
  ADD_ITEM: 'ADD_ITEM',
  EDIT_ITEM: 'EDIT_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  ADD_SUB_ITEM: 'ADD_SUB_ITEM',
  EDIT_SUB_ITEM: 'EDIT_SUB_ITEM',
  DELETE_SUB_ITEM: 'DELETE_SUB_ITEM',
  ADD_COMMENT: 'ADD_COMMENT',
  EDIT_COMMENT: 'EDIT_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  ADD_SUB_COMMENT: 'ADD_SUB_COMMENT',
  EDIT_SUB_COMMENT: 'EDIT_SUB_COMMENT',
  DELETE_SUB_COMMENT: 'DELETE_SUB_COMMENT',
}

export const updateLocalStorage = (state: Item[]) => {
  localStorage.setItem('list', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
  [ACTION.INIT_LIST]: async (state: Item[], action: any) => {
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
      comments: [],
    }
    const newState = [...state, newItem]
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.EDIT_ITEM]: (state: Item[], action: any) => {
    const { itemId, attribute, value } = action.payload
    if (attribute === 'completed') {
      updateItemStatus(itemId, value)
    } else if (attribute === 'text') {
      updateItemText(itemId, value)
    }
    const newState = state.map((item) =>
      item.id === itemId ? { ...item, [attribute]: value } : item,
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
      comments: [],
    }
    const newState = state.map((item) =>
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
    const { itemId, subItemId, attribute, value } = action.payload
    if (attribute === 'completed') {
      updateSubItemStatus(itemId, subItemId, value)
    } else if (attribute === 'text') {
      updateSubItemText(itemId, subItemId, value)
    }
    const isStatusPending = attribute === 'completed' && value == false

    if (isStatusPending) {
      updateItemStatus(itemId, false)
    }
    const newState = state.map((item) => {
      if (item.id === itemId) {
        const updatedSubItems = item.subItems?.map((subItem) =>
          subItem.id === subItemId
            ? { ...subItem, [attribute]: value }
            : subItem,
        )
        return {
          ...item,
          completed: isStatusPending ? false : item.completed,
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
  [ACTION.ADD_COMMENT]: (state: Item[], action: any) => {
    const { itemId, newCommentId } = action.payload
    const newComment = {
      id: newCommentId,
      text: '',
    }
    const newState = state.map((item) =>
      item.id === itemId
        ? {
            ...item,
            comments: [...(item.comments || []), newComment],
          }
        : item,
    )
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.EDIT_COMMENT]: (state: Item[], action: any) => {
    const { itemId, commentId, value } = action.payload
    updateComment(itemId, commentId, value)
    const newState = state.map((item) => {
      if (item.id === itemId) {
        const updatedComments = item.comments?.map((comment) =>
          comment.id === commentId ? { ...comment, text: value } : comment,
        )
        return {
          ...item,
          comments: updatedComments,
        }
      }
      return item
    })
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.DELETE_COMMENT]: (state: Item[], action: any) => {
    const { itemId, commentId } = action.payload
    deleteComment(itemId, commentId)
    const newState = state.map((item) => {
      if (item.id === itemId) {
        const updatedComments = item.comments?.filter(
          (comment) => comment.id !== commentId,
        )
        return { ...item, comments: updatedComments }
      }
      return item
    })
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.ADD_SUB_COMMENT]: (state: Item[], action: any) => {
    const { itemId, subItemId } = action.payload
    const newComment = {
      id: crypto.randomUUID(),
      text: '',
    }
    const newState = state.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems?.map((subItem) => {
            if (subItem.id === subItemId) {
              return {
                ...subItem,
                comments: [...(subItem.comments || []), newComment],
              }
            }
            return subItem
          }),
        }
      }
      return item
    })
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.EDIT_SUB_COMMENT]: (state: Item[], action: any) => {
    const { itemId, subItemId, commentId, value } = action.payload
    const newState = state.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems?.map((subItem) => {
            if (subItem.id === subItemId) {
              const updatedComments = subItem.comments?.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      text: value,
                    }
                  : comment,
              )
              return { ...subItem, comments: updatedComments }
            }
            return subItem
          }),
        }
      }
      return item
    })
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.DELETE_SUB_COMMENT]: (state: Item[], action: any) => {
    const { itemId, subItemId, commentId } = action.payload
    const newState = state.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems?.map((subItem) => {
            if (subItem.id === subItemId) {
              const updatedComments = subItem.comments?.filter(
                (comment) => comment.id !== commentId,
              )
              return { ...subItem, comments: updatedComments }
            }
            return subItem
          }),
        }
      }
      return item
    })
    updateLocalStorage(newState)
    return newState
  },
}

export const todoReducer = (state, action: any) => {
  const updateState = UPDATE_STATE_BY_ACTION[action.type]
  return updateState ? updateState(state, action) : state
}
