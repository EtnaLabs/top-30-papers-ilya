"use client"

import { useEffect, useState } from "react"
import { PaperTimeline } from "@/components/paper-timeline"
import { getPapers, getPapersSortedByIlyaList } from "@/lib/data"
import { Button } from "@/components/ui/button"
import type { Item } from "@/lib/types"

export default function Home() {
  const [sortByIlya, setSortByIlya] = useState(true)
  const [papers, setPapers] = useState<Item[]>([])
  
  useEffect(() => {
    async function loadPapers() {
      if (sortByIlya) {
        const sortedPapers = await getPapersSortedByIlyaList()
        setPapers(sortedPapers)
      } else {
        const dateSortedPapers = await getPapers()
        setPapers(dateSortedPapers)
      }
    }
    
    loadPapers()
  }, [sortByIlya])
  
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
              onClick={() => setSortByIlya(false)}
            >
              Show by date
            </Button>
            <Button 
              variant={sortByIlya ? "default" : "outline"} 
              onClick={() => setSortByIlya(true)}
            >
              Show in Ilya&apos;s order
            </Button>
          </div>
        </div>
      </div>

      <PaperTimeline 
        key={`papers-${sortByIlya ? 'ilya' : 'date'}`} 
        papers={papers} 
      />
    </div>
  )
}
