import { useTodo } from '../hooks/useTodo'
import Close from '../assets/Close'
import Arrow from '../assets/Arrow'
import './Item.css'
import { SubItem, type Item } from '../types'
import { useMutation } from '@tanstack/react-query'
import { createSubItem } from '../service/subitem'

interface Props {
  item: Item | SubItem
  fatherId?: string
}

const Item = ({ item, fatherId = '' }: Props) => {
  const { editItem, deleteItem, addSubItem, editSubItem, deleteSubItem } =
    useTodo()

  const isSub = !('subItems' in item)

  const allSubItemsCompleted = isSub
    ? true
    : item.subItems.every((sl) => sl.completed == true)

  const style = {
    marginLeft: isSub ? '2rem' : '0',
  }

  const { mutate } = useMutation({
    mutationFn: async () => {
      const newSubItemId = await createSubItem(item.id)
      addSubItem(item.id, newSubItemId)
    },
  })

  const editStatus = (): void => {
    if (!allSubItemsCompleted) return

    const newStatus = !item.completed
    isSub
      ? editSubItem(fatherId, item.id, newStatus)
      : editItem(item.id, newStatus)
  }

  const editText = (e: any): void => {
    const newText = e.target.value
    isSub ? editSubItem(fatherId, item.id, newText) : editItem(item.id, newText)
  }

  const deleteFromList = (): void => {
    isSub ? deleteSubItem(fatherId, item.id) : deleteItem(item.id)
  }

  return (
    <>
      <div className="item" data-completed={item.completed}>
        <div className="status" onClick={editStatus} style={style}></div>
        <input
          className="text"
          type="text"
          value={item.text}
          onChange={editText}
        />
        <div className="action">
          {!isSub && (
            <div
              title="Agregar SubTarea"
              className="add-sub"
              onClick={() => mutate()}
            >
              <Arrow width={'1.3rem'} height={'1.3rem'} />
            </div>
          )}
          <div title="Eliminar" className="close" onClick={deleteFromList}>
            <Close width={'1.3rem'} height={'1.3rem'} />
          </div>
        </div>
      </div>
      {!isSub &&
        item.subItems.map((sub: SubItem) => (
          <Item key={sub.id} item={sub} fatherId={item.id} />
        ))}
    </>
  )
}

export default Item
