import { TODO_FILTER } from './const'

export interface Item {
  id: string
  text: string
  completed: boolean
  linkedItem: string
}

export interface IconProps {
  width: string
  height: string
}

export interface FilterContextType {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

export interface Filter {
  filterList: (list: Item[]) => Item[]
}

export interface TodoContextType {
  list: Item[]
  initList: (list: Item[]) => void
  addItem: (linkedItem?: string) => void
  editItem: (itemId: string, value: string | boolean) => void
  deleteItem: (itemId: string) => void
  addSubItem: (itemId: string) => void
  editSubItem: (
    itemId: string,
    subItemId: string,
    value: string | boolean,
  ) => void
  deleteSubItem: (itemId: string, subItemId: string) => void
}
