import React, { createContext, ReactElement, useState } from 'react'
import { FilterContextType, FilterValue } from '../types'
import { TODO_FILTER } from '../const'

export const FilterContext = createContext<FilterContextType>({
  filter: 'all',
  setFilter: () => {},
})

export const FilterProvider = ({ children }: any): ReactElement => {
  const [filter, setFilter] = useState<FilterValue>(TODO_FILTER.ALL)

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}
