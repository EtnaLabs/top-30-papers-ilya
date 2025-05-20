"use client"

import { useEffect, useState } from "react"
import { useAutoReload } from "./use-auto-reload"
import { Item } from "@/lib/types"
import { getPapers } from "@/lib/data"

interface UseTimelineDataOptions {
  autoReloadInterval?: number // in milliseconds
  initialDelay?: number // in milliseconds
  enabled?: boolean
}

export function useTimelineData(options: UseTimelineDataOptions = {}) {
  const {
    autoReloadInterval = 30000, // 30 seconds default
    initialDelay = 0,
    enabled = true,
  } = options

  // Function to fetch papers
  const fetchPapers = async (): Promise<Item[]> => {
    return getPapers()
  }

  // Use the auto-reload hook
  const {
    data: papers,
    loading,
    error,
    reload,
    lastUpdated,
  } = useAutoReload<Item[]>(fetchPapers, {
    interval: autoReloadInterval,
    initialDelay,
    enabled,
  })

  return {
    papers: papers || [],
    loading,
    error,
    reload,
    lastUpdated,
    isReady: papers !== null,
  }
} 