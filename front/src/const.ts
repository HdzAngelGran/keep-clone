export const TODO_FILTER = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const

export const FILTER_BUTTONS = {
  [TODO_FILTER.ALL]: {
    literal: 'Todos',
  },
  [TODO_FILTER.PENDING]: {
    literal: 'Pendientes',
  },
  [TODO_FILTER.COMPLETED]: {
    literal: 'Completadas',
  },
} as const

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
} as const
