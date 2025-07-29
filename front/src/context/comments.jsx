import { createContext, useState } from 'react'

export const CommentsContext = createContext()

export const CommentsProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [itemId, setItemId] = useState([])
  const [fatherId, setFatherId] = useState('')

  return (
    <CommentsContext.Provider
      value={{ open, setOpen, itemId, setItemId, fatherId, setFatherId }}
    >
      {children}
    </CommentsContext.Provider>
  )
}
