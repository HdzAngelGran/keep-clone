import axios from 'axios'

export const BASE_API_URL = 'http://localhost:8080/api/v1'
export const LIST_PATH = '/item'
export const ITEM_PATH = '/item'
export const SUB_ITEM_PATH = '/subItem'

axios.defaults.baseURL = BASE_API_URL
axios.defaults.timeout = 1000
