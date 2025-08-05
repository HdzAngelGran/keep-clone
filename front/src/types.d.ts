import { TODO_FILTER } from './const'

export interface Item {
  id: string
  text: string
  completed: boolean
  subItems: SubItem[]
  comments: Comment[]
}

export interface SubItem {
  id: string
  text: string
  completed: boolean
  comments: Comment[]
}

export interface Comment {
  id: string
  text: string
}

export interface IconProps {
  width: string
  height: string
}

export interface CommentsContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  itemId: string
  setItemId: React.Dispatch<React.SetStateAction<string>>
  fatherId: string
  setFatherId: React.Dispatch<React.SetStateAction<string>>
}

export type FilterValue = (typeof TODO_FILTER)[keyof typeof TODO_FILTER]

export interface FilterContextType {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<FilterValue>>
}

export interface TodoContextType {
  list: Item[]
  initList: (list: Item[]) => void
  addItem: (itemId: string) => void
  editItem: (itemId: string, value: string | boolean) => void
  deleteItem: (itemId: string) => void
  addSubItem: (itemId: string, newSubItemId: string) => void
  editSubItem: (
    itemId: string,
    subItemId: string,
    value: string | boolean,
  ) => void
  deleteSubItem: (itemId: string, subItemId: string) => void
  addComment: (itemId: string, newCommentId: string) => void
  editComment: (itemId: string, commentId: string, value: string) => void
  deleteComment: (itemId: string, commentId: string) => void
  addSubComment: (itemId: string, subItemId: string) => void
  editSubComment: (
    itemId: string,
    subItemId: string,
    commentId: string,
    value: string,
  ) => void
  deleteSubComment: (
    itemId: string,
    subItemId: string,
    commentId: string,
  ) => void
}
