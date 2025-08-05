import { useEffect, useReducer, useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import { useFilter } from '../hooks/useFilter'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getList } from '../service/list'

import Comments from './Comments'
import Item from './Item'
import './List.css'
import { Item as ItemType } from '../types'
import { createItem } from '../service/item'

export const SERVICE_URL = 'http://localhost:8080/api/v1/list'

function List() {
  const { filterList } = useFilter()
  const { list, initList, addItem } = useTodo()

  const filteredList = filterList(list)

  const { mutate } = useMutation({
    mutationFn: async () => {
      const newItemId = await createItem()
      addItem(newItemId)
    },
  })

  const { isPending, data = [] } = useQuery({
    queryKey: ['lists'],
    queryFn: getList,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!isPending) initList(data as ItemType[])
  }, [data, isPending])

  return (
    <>
      <Comments />
      <main className="list">
        {filteredList.map((item) => (
          <Item key={item.id} item={item} />
        ))}
        <button type="button" onClick={() => mutate()}>
          + Nueva tarea
        </button>
      </main>
    </>
  )
}

export default List
