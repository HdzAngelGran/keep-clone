import axios from 'axios'
import { ITEM_PATH } from './index'

const pendingRequests = new Map()

export async function createItem(): Promise<string> {
  return await axios
    .post(ITEM_PATH)
    .then((res) => {
      const data = res.data as { newItemId: string }
      return data.newItemId
    })
    .catch((error) => {
      console.error(error)
      return ''
    })
}

export async function updateItemStatus(itemId: string, status: boolean) {
  const request = await axios
    .put(`${ITEM_PATH}/${itemId}/status`, { status })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function updateItemText(itemId: string, text: string) {
  const request = await axios
    .put(`${ITEM_PATH}/${itemId}/text`, { text })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function deleteItem(itemId: string) {
  const requestKey = `${ITEM_PATH}/${itemId}`
  if (pendingRequests.has(requestKey)) return

  const request = axios
    .delete(`${ITEM_PATH}/${itemId}`)
    .then((res) => {
      pendingRequests.delete(requestKey)
    })
    .catch((error) => {
      console.error(error)
      pendingRequests.delete(requestKey)
    })
  pendingRequests.set(requestKey, request)
}

export async function createComment(itemId: string): Promise<string> {
  return await axios
    .post(`${ITEM_PATH}/${itemId}/comment`)
    .then((res) => {
      const data = res.data as { newCommentId: string }
      return data.newCommentId
    })
    .catch((error) => {
      console.error(error)
      return ''
    })
}

export async function updateComment(
  itemId: string,
  commentId: string,
  text: string,
) {
  const request = await axios
    .put(`${ITEM_PATH}/${itemId}/comment/${commentId}`, { text })
    .catch((error) => {
      console.error(error)
    })
  return request
}

export async function deleteComment(itemId: string, commentId: string) {
  const requestKey = `${ITEM_PATH}/${itemId}/comment/${commentId}`
  if (pendingRequests.has(requestKey)) return

  const request = axios
    .delete(`${ITEM_PATH}/${itemId}/comment/${commentId}`)
    .then((res) => {
      pendingRequests.delete(requestKey)
    })
    .catch((error) => {
      console.error(error)
      pendingRequests.delete(requestKey)
    })
  pendingRequests.set(requestKey, request)
}
