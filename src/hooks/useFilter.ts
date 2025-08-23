import { useContext } from 'react'
import type { Filter, Item } from '../types.js'
import { FilterContext } from '../context/filters.js'

export function useFilter(): Filter {
  const { checkedItems, setCheckedItems, uncheckedItems, setUncheckedItems } =
    useContext(FilterContext)

  const filterList = (list: Item[]): Item[] => {
    const listGroup: Item[] = []
    const subItemsMap = new Map<string, Item[]>()

    for (const item of list) {
      if (!item.linkedItem) continue

      if (!subItemsMap.has(item.linkedItem))
        subItemsMap.set(item.linkedItem, [])

      subItemsMap.get(item.linkedItem)!.push(item)
    }

    for (const item of list) {
      if (item.linkedItem) continue

      listGroup.push(item)
      const subItems = subItemsMap.get(item.id)
      if (subItems) listGroup.push(...subItems)
    }

    return listGroup
  }

  return {
    filterList,
  }
}
