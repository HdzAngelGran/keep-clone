import { createContext, ReactElement, useState } from 'react'
import type { Item, FilterContextType } from '../types'

export const FilterContext = createContext<FilterContextType>({
  checkedItems: [],
  setCheckedItems: () => {},
  uncheckedItems: [],
  setUncheckedItems: () => {},
})

export const FilterProvider = ({ children }: any): ReactElement => {
  const [checkedItems, setCheckedItems] = useState<Item[]>([])
  const [uncheckedItems, setUncheckedItems] = useState<Item[]>([])

  return (
    <FilterContext.Provider
      value={{
        checkedItems,
        setCheckedItems,
        uncheckedItems,
        setUncheckedItems,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
