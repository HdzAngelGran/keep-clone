import { useTodo } from '../hooks/useTodo'
import Close from '../assets/Close'
import './Item.css'

function Item({ item }) {
  const { editItem, deleteItem } = useTodo()

  const editStatus = () => {
    const newStatus = !item.completed
    editItem(item.id, 'completed', newStatus)
  }

  const editText = (e) => {
    const newText = e.target.value
    editItem(item.id, 'text', newText)
  }

  const deleteFromList = () => {
    deleteItem(item.id)
  }

  return (
    <>
      <div className="item" data-completed={item.completed}>
        <div className="status" onClick={editStatus}></div>
        <input
          className="text"
          type="text"
          value={item.text}
          onChange={editText}
        />
        <div className="action">
          <div title="Eliminar" className="close" onClick={deleteFromList}>
            <Close width={'1.3rem'} height={'1.3rem'} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Item
