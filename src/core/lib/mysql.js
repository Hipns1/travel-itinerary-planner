import mysql from 'serverless-mysql'
import { API_DATABASE, API_HOST, API_PASSWORD, API_PORT, API_USER } from '@/core/lib'

export const pool = mysql({
    config: {
        host: API_HOST,
        user: API_USER,
        password: API_PASSWORD,
        port: API_PORT,
        database: API_DATABASE,
    }
})