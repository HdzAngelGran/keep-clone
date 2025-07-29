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
}

export const todoReducer = (state, action) => {
  const updateState = UPDATE_STATE_BY_ACTION[action.type]
  return updateState ? updateState(state, action) : state
}
