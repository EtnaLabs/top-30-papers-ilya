"use client"

import { useEffect, useState } from "react"
import { PaperTimeline } from "@/components/paper-timeline"
import { getPapers, getPapersSortedByIlyaList } from "@/lib/data"
import { Button } from "@/components/ui/button"
import type { Item } from "@/lib/types"
import Cookies from "js-cookie"
import { toast } from "@/hooks/use-toast"
import { CheckIcon } from "lucide-react"

// Cookie name for sort preference
const SORT_PREFERENCE_COOKIE = "paper-sort-preference"

export default function Home() {
  // Initialize with the cookie value if available, otherwise default to Ilya's order
  const [sortByIlya, setSortByIlya] = useState(true)
  const [papers, setPapers] = useState<Item[]>([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  
  // Load the sort preference from cookie on initial render
  useEffect(() => {
    const savedPreference = Cookies.get(SORT_PREFERENCE_COOKIE)
    // If we have a saved preference, use it
    if (savedPreference) {
      setSortByIlya(savedPreference === "ilya")
    }
    setIsInitialLoad(false)
  }, [])
  
  // Load papers based on sort preference
  useEffect(() => {
    async function loadPapers() {
      setIsLoading(true)
      try {
        if (sortByIlya) {
          const sortedPapers = await getPapersSortedByIlyaList()
          setPapers(sortedPapers)
        } else {
          const dateSortedPapers = await getPapers()
          setPapers(dateSortedPapers)
        }
      } finally {
        setIsLoading(false)
      }
    }
    
    loadPapers()
    
    // Save preference to cookie whenever it changes, but not on initial load
    if (!isInitialLoad) {
      Cookies.set(SORT_PREFERENCE_COOKIE, sortByIlya ? "ilya" : "date", { expires: 365 }) // expires in 1 year
      
      // Show a toast notification that preference was saved
      toast({
        title: "Preference saved",
        description: `Viewing papers ${sortByIlya ? "in Ilya's order" : "by date"}.`,
        duration: 2000,
        className: "bg-green-50 border-green-200",
        action: (
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
            <CheckIcon className="h-4 w-4 text-green-600" />
          </div>
        ),
      })
    }
  }, [sortByIlya, isInitialLoad])
  
  // Handlers for changing sort preference
  const handleSortByDate = () => {
    setSortByIlya(false)
    window.scrollTo(0, 0)
  }
  
  const handleSortByIlya = () => {
    setSortByIlya(true)
    window.scrollTo(0, 0)
  }
  
  return (
    <div className="container mx-auto py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">Ilya Sutskever&apos;s Top 30 AI Papers</h1>
        <p className="mt-2 text-gray-600 max-w-3xl mx-auto font-light leading-relaxed tracking-wide text-lg">
          Ilya Sutskever shared a list of 30 papers with John Carmack and said, &quot;If you really learn all of these,
          you&apos;ll know 90% of what matters today&quot;. Below we will review these papers/resources.
        </p>
        
        <div className="flex flex-col items-center gap-2 mt-8">
          <div className="flex justify-center gap-4">
            <Button 
              variant={sortByIlya ? "outline" : "default"} 
              onClick={handleSortByDate}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Show by date"}
            </Button>
            <Button 
              variant={sortByIlya ? "default" : "outline"} 
              onClick={handleSortByIlya}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Show in Ilya&apos;s order"}
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <PaperTimeline 
          key={`papers-${sortByIlya ? 'ilya' : 'date'}`} 
          papers={papers} 
        />
      )}
    </div>
  )
}
