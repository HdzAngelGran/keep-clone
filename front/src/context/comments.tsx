import { createContext, useState } from 'react'
import { CommentsContextType } from '../types'

export const CommentsContext = createContext<CommentsContextType>({
  open: false,
  setOpen: () => {},
  itemId: '',
  setItemId: () => {},
  fatherId: '',
  setFatherId: () => {},
})

export const CommentsProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [itemId, setItemId] = useState('')
  const [fatherId, setFatherId] = useState('')

  return (
    <CommentsContext.Provider
      value={{ open, setOpen, itemId, setItemId, fatherId, setFatherId }}
    >
      {children}
    </CommentsContext.Provider>
  )
}
