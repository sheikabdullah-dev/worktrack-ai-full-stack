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
// ✅ UPDATE
export const updateLog = async (id: string, data: any) => {
  return api.put(`/logs/${id}`, data)
}

// ✅ DELETE
export const deleteLog = async (id: string) => {
  return api.delete(`/logs/${id}`)
}

export default api