import { useTodo } from '../hooks/useTodo'
import Item from './Item'
import './List.css'

function List() {
  const { list, addItem } = useTodo()

  return (
    <>
      <main className="list">
        {list.map((item) => (
          <Item key={item.id} item={item} />
        ))}
        <button type="button" onClick={addItem}>
          + Nueva tarea
        </button>
      </main>
    </>
  )
}

export default List
