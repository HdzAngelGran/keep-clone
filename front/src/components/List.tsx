import { useEffect, useReducer, useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import { useFilter } from '../hooks/useFilter'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getList } from '../service/list'

import Item from './Item'
import './List.css'
import { Item as ItemType } from '../types'
import { createItem } from '../service/item'

export const SERVICE_URL = 'http://localhost:8080/api/v1/list'

function List() {
  const { filterList } = useFilter()
  const { list, addItem } = useTodo()

  const filteredList = filterList(list)

  return (
    <>
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
