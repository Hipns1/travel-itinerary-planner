'use client'
import axios from 'axios'
import { API_URL } from '@/core/lib'

export const travelsApi = axios.create({
  baseURL: API_URL
})

travelsApi.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
)
