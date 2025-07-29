import { useContext } from 'react'
import { FilterContext } from '../context/filters.jsx'

export function useFilter() {
  const { filter, setFilter } = useContext(FilterContext)

  const filterList = (list) => {
    if (filter === 'all') return list
    const rule = filter === 'completed' ? true : false
    return list.filter((item) => item.completed === rule)
  }

  return {
    filter,
    setFilter,
    filterList,
  }
}
