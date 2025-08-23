import { useTodo } from '../hooks/useTodo'
import { useFilter } from '../hooks/useFilter'
import Plus from '../assets/Plus'

import Item from './Item'
import './List.css'

export const SERVICE_URL = 'http://localhost:8080/api/v1/list'

function List() {
  const { filterList } = useFilter()
  const { list, addItem } = useTodo()

  const sortedList = filterList(list)
  const checkedItems = sortedList.filter((item) => item.completed)
  const uncheckedItems = sortedList.filter((item) => !item.completed)

  return (
    <main>
      <div className="list">
        {uncheckedItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
        <button type="button" onClick={() => addItem()}>
          <Plus
            width={'1.3rem'}
            height={'1.3rem'}
            style={{ marginRight: '0.2rem' }}
          />
          List item
        </button>
        {checkedItems.length > 0 && (
          <details>
            <summary>{checkedItems.length} Checked items</summary>
            <div className="list">
              {checkedItems.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </div>
          </details>
        )}
      </div>
    </main>
  )
}

export default List
