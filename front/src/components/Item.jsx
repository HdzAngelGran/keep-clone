import { useTodo } from '../hooks/useTodo'
import Close from '../assets/Close'
import Arrow from '../assets/Arrow'
import './Item.css'

function Item({ item, fatherId = '' }) {
  const { editItem, deleteItem, addSubItem, editSubItem, deleteSubItem } =
    useTodo()

  const isSub = fatherId !== ''
  const allSubItemsCompleted = item.subItems?.every(
    (sl) => sl.completed == true,
  )

  const style = {
    marginLeft: isSub ? '2rem' : '0',
  }

  const editStatus = () => {
    if (!isSub && !allSubItemsCompleted) return

    const newStatus = !item.completed
    if (isSub) {
      editSubItem(fatherId, item.id, 'completed', newStatus)
      return
    }
    editItem(item.id, 'completed', newStatus)
  }

  const editText = (e) => {
    const newText = e.target.value
    if (isSub) {
      editSubItem(fatherId, item.id, 'text', newText)
      return
    }
    editItem(item.id, 'text', newText)
  }

  const deleteFromList = () => {
    if (isSub) {
      deleteSubItem(fatherId, item.id)
      return
    }
    deleteItem(item.id)
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
              onClick={() => addSubItem(item.id)}
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
        item.subItems?.map((sub) => (
          <Item key={sub.id} item={sub} fatherId={item.id} />
        ))}
    </>
  )
}

export default Item
