"use client"

import { useEffect, useState } from "react"

interface UseAutoReloadOptions {
  interval?: number // in milliseconds
  initialDelay?: number // in milliseconds
  enabled?: boolean
}

export function useAutoReload<T>(
  fetchFunction: () => Promise<T>,
  options: UseAutoReloadOptions = {}
) {
  const {
    interval = 5000, // Default to 5 seconds
    initialDelay = 0,
    enabled = true,
  } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const reload = async () => {
    if (!enabled) return

    setLoading(true)
    setError(null)

    try {
      const newData = await fetchFunction()
      setData(newData)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setLoading(false)
    }
  }

  // Initial load with potential delay
  useEffect(() => {
    const timer = setTimeout(() => {
      reload()
    }, initialDelay)

    return () => clearTimeout(timer)
  }, [initialDelay, enabled])

  // Set up interval for auto-reload
  useEffect(() => {
    if (!enabled) return

    const intervalId = setInterval(() => {
      reload()
    }, interval)

    return () => clearInterval(intervalId)
  }, [interval, enabled])

  return {
    data,
    loading,
    error,
    reload, // Manual reload function
    lastUpdated,
  }
} 