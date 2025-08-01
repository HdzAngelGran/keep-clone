import { useContext } from 'react'
import { FilterContext } from '../context/filters.js'
import { FilterContextType, Item } from '../types.js'

interface Filter extends FilterContextType {
  filterList: (list: Item[]) => Item[]
}

export function useFilter(): Filter {
  const { filter, setFilter } = useContext(FilterContext)

  const filterList = (list: Item[]) : Item[] => {
    if (filter === 'all') return list
    const rule = filter === 'completed' ? true : false
    return list.filter((item: Item) => item.completed === rule)
  }

  return {
    filter,
    setFilter,
    filterList,
  }
}
