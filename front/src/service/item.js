import axios from 'axios'
import { BASE_API_URL } from './index'
const PATH = '/item'

const SERVICE_URL = BASE_API_URL + PATH

const pendingRequests = new Map()

export async function updateItemStatus(itemId, status) {
  const request = await axios
    .put(`${SERVICE_URL}/${itemId}/status`, { status })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function updateItemText(itemId, text) {
  const request = await axios
    .put(`${SERVICE_URL}/${itemId}/text`, { text })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function deleteItem(itemId) {
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

export async function updateComment(itemId, commentId, text) {
  const request = await axios
    .put(`${SERVICE_URL}/${itemId}/comment/${commentId}`, { text })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function deleteComment(itemId, commentId) {
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
