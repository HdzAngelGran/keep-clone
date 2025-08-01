import axios from 'axios'
import { ITEM_PATH, SUB_ITEM_PATH } from './index'

const pendingRequests = new Map()

export async function addSubItem(itemId: string): Promise<string | void> {
  return await axios
    .post(`${ITEM_PATH}/${itemId}/${SUB_ITEM_PATH}`)
    .then((res) => {
      const data = res.data as { newSubItemId: string }
      return data.newSubItemId
    })
    .catch((error) => {
      console.error(error)
    })
}

export async function updateSubItemStatus(
  itemId: string,
  subItemId: string,
  status: boolean,
) {
  const request = await axios
    .put(`${ITEM_PATH}/${itemId}${SUB_ITEM_PATH}/${subItemId}/status`, {
      status,
    })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function updateSubItemText(
  itemId: string,
  subItemId: string,
  text: string,
) {
  const request = await axios
    .put(`${ITEM_PATH}/${itemId}${SUB_ITEM_PATH}/${subItemId}/text`, { text })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function deleteSubItem(itemId: string, subItemId: string) {
  const requestKey = `${ITEM_PATH}/${itemId}${SUB_ITEM_PATH}/${subItemId}`
  if (pendingRequests.has(requestKey)) return

  const request = axios
    .delete(`${ITEM_PATH}/${itemId}${SUB_ITEM_PATH}/${subItemId}`)
    .then(() => {
      pendingRequests.delete(requestKey)
    })
    .catch((error) => {
      console.error(error)
      pendingRequests.delete(requestKey)
    })
  pendingRequests.set(requestKey, request)
}
