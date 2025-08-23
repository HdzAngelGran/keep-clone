import type { Item, Filter } from '../types.js'

export function useFilter(): Filter {
  const filterList = (list: Item[]) => {
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
