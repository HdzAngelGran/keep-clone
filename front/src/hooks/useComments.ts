import React, { useContext } from 'react'
import { CommentsContext } from '../context/comments.js'
import { CommentsContextType } from '../types.js'

export function useComments(): CommentsContextType {
  const context = useContext(CommentsContext)
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentsProvider')
  }
  return context
}
