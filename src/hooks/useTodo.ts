import React, { useContext } from 'react'
import { TodoContext } from '../context/todo'
import { TodoContextType } from '../types'

export const useTodo = ():TodoContextType => {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider')
  }
  return context
}
