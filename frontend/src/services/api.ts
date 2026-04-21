import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000"
})

// GET LOGS
export const getLogs = async () => {
  const res = await api.get("/logs")

  return res.data.map((item: any) => ({
    ...item,
    date: item.log_date   // ✅ IMPORTANT FIX
  }))
}

// CREATE LOG
export const createLog = async (data: any) => {
  return api.post("/logs", data)
}

export default api