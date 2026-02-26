import axios from "axios"

const baseURL = process.env.API_BASE_URL

if (!baseURL) {
  throw new Error("API_BASE_URL belum diset")
}

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
})