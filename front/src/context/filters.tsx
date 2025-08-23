import { createContext, ReactElement, useState } from 'react'
import type { FilterContextType } from '../types'

export const FilterContext = createContext<FilterContextType>({
  filter: 'all',
  setFilter: () => {},
})

export const FilterProvider = ({ children }: any): ReactElement => {
  const [filter, setFilter] = useState<string>('')

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}
