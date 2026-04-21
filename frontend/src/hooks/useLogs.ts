import { useEffect, useState } from "react"
import { getLogs, createLog } from "../services/api"

export const useLogs = () => {

  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const loadLogs = async () => {
    setLoading(true)
    try {
      const data = await getLogs()
      setLogs(data)
    } catch (err) {
      console.error("Error loading logs", err)
    }
    setLoading(false)
  }

  const addLog = async (log: any) => {
    await createLog(log)
    await loadLogs()
  }

  useEffect(() => {
    loadLogs()
  }, [])

  return {
    logs,
    addLog,
    loading,
    refresh: loadLogs // ✅ IMPORTANT
  }
}