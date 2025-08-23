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
  style?: Record<string, string>
}

export interface FilterContextType {
  uncheckedItems: Item[]
  setUncheckedItems: React.Dispatch<React.SetStateAction<Item[]>>
  checkedItems: Item[]
  setCheckedItems: React.Dispatch<React.SetStateAction<Item[]>>
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
