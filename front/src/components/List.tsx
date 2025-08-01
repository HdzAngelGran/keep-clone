import { useEffect, useReducer, useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import { useFilter } from '../hooks/useFilter'
import { todoReducer, todoInitialState } from '../reducers/todo'
import { type Item as ItemType } from '../types'

import axios from 'axios'
import Comments from './Comments'
import Item from './Item'
import './List.css'

export const SERVICE_URL = 'http://localhost:8080/api/v1/list'

function List() {
  const { filterList } = useFilter()
  const { list, addItem } = useTodo()

  const filteredList = filterList(list)

  const [loading, setLoading] = useState(true)
  const [_, dispatch] = useReducer(todoReducer, todoInitialState)

  useEffect(() => {
    setLoading(true)
    axios
      .get(SERVICE_URL)
      .then((res) => {
        const data = res.data as { list: ItemType[] }
        dispatch({ type: 'INIT_LIST', payload: { list: data.list } })
        setLoading(false)
      })
      .catch((e) => {
        console.error(e)
        setLoading(false)
      })
  }, [dispatch])

  return (
    <>
      {!loading && <Comments />}
      <main className="list">
        {!loading &&
          filteredList.map((item) => <Item key={item.id} item={item} />)}
        <button type="button" onClick={addItem}>
          + Nueva tarea
        </button>
      </main>
    </>
  )
}

export default List
