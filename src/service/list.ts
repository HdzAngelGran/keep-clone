import axios from 'axios'
import { type Item } from '../types'
import { LIST_PATH } from '.'

export const getList = async () => {
  return await axios
    .get(LIST_PATH)
    .then((res) => {
      const data = res.data as { list: Item[] }
      return data.list
    })
    .catch((e) => {
      console.error(e)
    })
}
