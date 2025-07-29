export const todoInitialState = JSON.parse(localStorage.getItem('list')) || [
  {
    id: crypto.randomUUID(),
    completed: false,
    text: '',
  },
]

export const ACTION = {
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

export const updateLocalStorage = (state) => {
  localStorage.setItem('list', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
  [ACTION.ADD_ITEM]: (state) => {
    const newItem = {
      id: crypto.randomUUID(),
      completed: false,
      text: '',
      subItems: [],
    }
    const newState = [...state, newItem]
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.EDIT_ITEM]: (state, action) => {
    const { itemId, attribute, value } = action.payload
    const newState = state.map((item) =>
      item.id === itemId ? { ...item, [attribute]: value } : item,
    )
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.DELETE_ITEM]: (state, action) => {
    const newState = state.filter((item) => item.id !== action.payload)
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.ADD_SUB_ITEM]: (state, action) => {
    const { itemId } = action.payload

    const newSubItem = {
      id: crypto.randomUUID(),
      completed: false,
      text: '',
    }
    const newState = state.map((item) =>
      item.id === itemId
        ? {
            ...item,
            completed: false,
            subItems: [...item.subItems, newSubItem],
          }
        : item,
    )
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.EDIT_SUB_ITEM]: (state, action) => {
    const { itemId, subItemId, attribute, value } = action.payload
    const isStatusPending = attribute === 'completed' && value == false
    const newState = state.map((item) => {
      if (item.id === itemId) {
        const updatedSubItems = item.subItems.map((subItem) =>
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
  [ACTION.DELETE_SUB_ITEM]: (state, action) => {
    const { itemId, subItemId } = action.payload
    const newState = state.map((item) => {
      if (item.id === itemId) {
        const updatedSubItems = item.subItems.filter(
          (subItem) => subItem.id !== subItemId,
        )
        return { ...item, subItems: updatedSubItems }
      }
      return item
    })
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.ADD_COMMENT]: (state, action) => {
    const { itemId } = action.payload
    const newComment = {
      id: crypto.randomUUID(),
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
  [ACTION.EDIT_COMMENT]: (state, action) => {
    const { itemId, commentId, value } = action.payload
    const newState = state.map((item) => {
      if (item.id === itemId) {
        const updatedComments = item.comments.map((comment) =>
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
  [ACTION.DELETE_COMMENT]: (state, action) => {
    const { itemId, commentId } = action.payload
    const newState = state.map((item) => {
      if (item.id === itemId) {
        const updatedComments = item.comments.filter(
          (comment) => comment.id !== commentId,
        )
        return { ...item, comments: updatedComments }
      }
      return item
    })
    updateLocalStorage(newState)
    return newState
  },
  [ACTION.ADD_SUB_COMMENT]: (state, action) => {
    const { itemId, subItemId } = action.payload
    const newComment = {
      id: crypto.randomUUID(),
      text: '',
    }
    const newState = state.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems.map((subItem) => {
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
  [ACTION.EDIT_SUB_COMMENT]: (state, action) => {
    const { itemId, subItemId, commentId, value } = action.payload
    const newState = state.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems.map((subItem) => {
            if (subItem.id === subItemId) {
              const updatedComments = subItem.comments.map((comment) =>
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
  [ACTION.DELETE_SUB_COMMENT]: (state, action) => {
    const { itemId, subItemId, commentId } = action.payload
    const newState = state.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems.map((subItem) => {
            if (subItem.id === subItemId) {
              const updatedComments = subItem.comments.filter(
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

export const todoReducer = (state, action) => {
  const updateState = UPDATE_STATE_BY_ACTION[action.type]
  return updateState ? updateState(state, action) : state
}
