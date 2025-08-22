import { TODO_FILTER } from './const'

export interface Item {
  id: string
  text: string
  completed: boolean
  subItems: SubItem[]
}

export interface SubItem {
  id: string
  text: string
  completed: boolean
}

export interface IconProps {
  width: string
  height: string
}

export type FilterValue = (typeof TODO_FILTER)[keyof typeof TODO_FILTER]

export interface FilterContextType {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<FilterValue>>
}

export interface TodoContextType {
  list: Item[]
  initList: (list: Item[]) => void
  addItem: () => void
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
