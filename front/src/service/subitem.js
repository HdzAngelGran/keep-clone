import axios from 'axios'
import { BASE_API_URL } from './index'
const PATH = '/item'
const SUB_PATH = '/subItem'

const SERVICE_URL = BASE_API_URL + PATH

const pendingRequests = new Map()

export async function updateSubItemStatus(itemId, subItemId, status) {
  const request = await axios
    .put(`${SERVICE_URL}/${itemId}${SUB_PATH}/${subItemId}/status`, { status })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function updateSubItemText(itemId, subItemId, text) {
  const request = await axios
    .put(`${SERVICE_URL}/${itemId}${SUB_PATH}/${subItemId}/text`, { text })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function deleteSubItem(itemId, subItemId) {
  const requestKey = `${SERVICE_URL}/${itemId}${SUB_PATH}/${subItemId}`
  if (pendingRequests.has(requestKey)) return

  const request = axios
    .delete(`${SERVICE_URL}/${itemId}${SUB_PATH}/${subItemId}`)
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      pendingRequests.delete(requestKey)
    })
  pendingRequests.set(requestKey, request)
}
