import { useTodo } from '../hooks/useTodo'
import { useFilter } from '../hooks/useFilter'
import Comments from './Comments'
import Item from './Item'
import './List.css'

function List() {
  const { filterList } = useFilter()
  const { list, addItem } = useTodo()

  const filteredList = filterList(list)

  return (
    <>
      <Comments />
      <main className="list">
        {filteredList.map((item) => (
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
