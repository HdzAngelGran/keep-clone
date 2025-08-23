import { useTodo } from '../hooks/useTodo'
import Close from '../assets/Close'
import Arrow from '../assets/Arrow'
import './Item.css'
import type { Item } from '../types'

interface Props {
  item: Item
}

const Item = ({ item }: Props) => {
  const { editItem, deleteItem, addItem } = useTodo()

  const isSub = item.linkedItem && item.linkedItem?.trim() !== ''

  const style = {
    marginLeft: isSub ? '2rem' : '0',
  }

  const createSubItem = () => addItem(item.id)

  const editStatus = () => editItem(item.id, !item.completed)

  const editText = (e: any) => editItem(item.id, e.target.value)

  const deleteFromList = () => deleteItem(item.id)

  return (
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
            onClick={createSubItem}
          >
            <Arrow width={'1.3rem'} height={'1.3rem'} />
          </div>
        )}
        <div title="Eliminar" className="close" onClick={deleteFromList}>
          <Close width={'1.3rem'} height={'1.3rem'} />
        </div>
      </div>
    </div>
  )
}

export default Item
