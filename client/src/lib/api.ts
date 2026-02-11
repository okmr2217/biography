import { API_URL } from "@/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: API_URL,
})

// リクエストインターセプター: トークンをヘッダーに追加
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// トークン管理用ヘルパー関数
export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const getToken = () => {
  return localStorage.getItem('token')
}
