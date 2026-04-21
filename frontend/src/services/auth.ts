import axios from "axios"

const API = "http://localhost:3000/auth"

// ✅ SIGNUP
export const signup = async (data: {
  email: string
  password: string
}) => {
  return axios.post(`${API}/signup`, data)
}

// ✅ LOGIN
export const login = async (data: {
  email: string
  password: string
}) => {
  return axios.post(`${API}/login`, data)
}