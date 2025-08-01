import axios from 'axios'
import { BASE_API_URL } from './index'
const PATH = '/item'

const SERVICE_URL = BASE_API_URL + PATH

const pendingRequests = new Map()

export async function updateItemStatus(itemId: string, status: boolean) {
  const request = await axios
    .put(`${SERVICE_URL}/${itemId}/status`, { status })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function updateItemText(itemId: string, text: string) {
  const request = await axios
    .put(`${SERVICE_URL}/${itemId}/text`, { text })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function deleteItem(itemId: string) {
  const requestKey = `${SERVICE_URL}/${itemId}`
  if (pendingRequests.has(requestKey)) return

  const request = axios
    .delete(`${SERVICE_URL}/${itemId}`)
    .then((res) => {
      pendingRequests.delete(requestKey)
    })
    .catch((error) => {
      console.error(error)
      pendingRequests.delete(requestKey)
    })
  pendingRequests.set(requestKey, request)
}

export async function updateComment(itemId: string, commentId: string, text: string) {
  const request = await axios
    .put(`${SERVICE_URL}/${itemId}/comment/${commentId}`, { text })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function deleteComment(itemId: string, commentId: string) {
  const requestKey = `${SERVICE_URL}/${itemId}/comment/${commentId}`
  if (pendingRequests.has(requestKey)) return

  const request = axios
    .delete(`${SERVICE_URL}/${itemId}/comment/${commentId}`)
    .then((res) => {
      pendingRequests.delete(requestKey)
    })
    .catch((error) => {
      console.error(error)
      pendingRequests.delete(requestKey)
    })
  pendingRequests.set(requestKey, request)
}
