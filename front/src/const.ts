export const TODO_FILTER = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: "completed"
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
  }
} as const