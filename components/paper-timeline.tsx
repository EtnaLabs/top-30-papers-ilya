"use client"

import { useEffect, useRef, useState } from "react"
import { PaperCard } from "@/components/paper-card"
import type { Item } from "@/lib/types"
import { useInView } from "react-intersection-observer"
import { useMobile } from "@/hooks/use-mobile"

export function PaperTimeline({ papers }: { papers: Item[] }) {
  const [activePaper, setActivePaper] = useState<Item | null>(null)
  const [currentYear, setCurrentYear] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Set the first paper as active by default
  useEffect(() => {
    if (papers.length > 0 && !activePaper && papers.some((p) => p.type === "paper")) {
      const firstPaper = papers.find((p) => p.type === "paper")
      if (firstPaper) {
        setActivePaper(firstPaper)
        setCurrentYear(new Date(firstPaper.date).getFullYear())
      }
    }
  }, [papers, activePaper])

  // Get unique years from papers
  const years = [...new Set(papers.map((paper) => new Date(paper.date).getFullYear()))].sort()

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div ref={timelineRef} className="relative flex-1 max-w-full lg:max-w-[60%]">
        {/* Year counter */}
        {currentYear && (
          <div className="sticky top-4 z-20 flex justify-end mb-4">
            <div className="bg-blue-600 text-white font-bold rounded-full px-4 py-2 text-lg shadow-md">
              {currentYear}
            </div>
          </div>
        )}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Year markers */}
          <div className="absolute left-0 top-0 bottom-0">
            {years.map((year, index) => {
              // Find the first paper in this year
              const firstPaperInYear = papers.find((p) => new Date(p.date).getFullYear() === year)
              if (!firstPaperInYear) return null

              // Find the index of this paper
              const paperIndex = papers.findIndex((p) => p.id === firstPaperInYear.id)

              // Calculate position based on previous papers
              let position = 0
              for (let i = 0; i < paperIndex; i++) {
                const currentDate = new Date(papers[i].date)
                const nextDate = new Date(papers[i + 1].date)
                const monthsDiff =
                  (nextDate.getFullYear() - currentDate.getFullYear()) * 12 +
                  (nextDate.getMonth() - currentDate.getMonth())
                position += 3 + monthsDiff * 0.5 // Same calculation as in TimelineItem
              }

              return (
                <div
                  key={year}
                  className="absolute left-[-2rem] flex items-center"
                  style={{ top: `${position + 1.5}rem` }}
                >
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{year}</span>
                </div>
              )
            })}
          </div>

          {/* Timeline items */}
          <div>
            {papers.map((paper, index) => (
              <TimelineItem
                key={paper.id || `event-${index}`}
                paper={paper}
                isActive={activePaper?.id === paper.id}
                onInView={() => {
                  if (!isMobile && paper.type === "paper") {
                    setActivePaper(paper)
                    setCurrentYear(new Date(paper.date).getFullYear())
                  }
                }}
                prevDate={index > 0 ? papers[index - 1].date : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail box - fixed on desktop, scrolls with content on mobile */}
      {!isMobile && activePaper && activePaper.type === "paper" && (
        <div className="lg:sticky lg:top-8 lg:self-start lg:w-[40%] h-fit">
          <PaperCard paper={activePaper} />
        </div>
      )}
    </div>
  )
}

function TimelineItem({
  paper,
  isActive,
  onInView,
  prevDate,
}: {
  paper: Item
  isActive: boolean
  onInView: () => void
  prevDate?: string
}) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })
  const isMobile = useMobile()

  useEffect(() => {
    if (inView) {
      onInView()
    }
  }, [inView, onInView])

  // Calculate the gap based on the time difference between this paper and the previous one
  const getTimeGap = () => {
    if (!prevDate) return 0 // First item has no gap

    const currentDate = new Date(paper.date)
    const previousDate = new Date(prevDate)

    // Calculate months difference
    const monthsDiff =
      (currentDate.getFullYear() - previousDate.getFullYear()) * 12 + (currentDate.getMonth() - previousDate.getMonth())

    // Scale factor - adjust this to control the overall spacing
    const scaleFactor = 0.8 // Increased from 0.5 to 0.8

    // Base gap (minimum spacing) in rem
    const baseGap = 3

    // Calculate the gap in rem, with a minimum of baseGap
    return baseGap + monthsDiff * scaleFactor
  }

  const timeGap = getTimeGap()

  // Different styling for events vs papers
  const isEvent = paper.type === "event"

  return (
    <div
      ref={ref}
      className="relative pl-10"
      style={{
        marginTop: `${timeGap}rem`,
      }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-[14px] top-6 w-3 h-3 rounded-full border-2 border-white z-10 transform -translate-x-1/2 -translate-y-1/2 ${
          isEvent ? "bg-amber-500" : isActive ? "bg-blue-500" : "bg-gray-300"
        }`}
      />

      <div className={`space-y-1 ${isEvent ? "bg-amber-50 p-3 rounded-md border border-amber-200" : ""}`}>
        <span className="text-sm text-gray-500 font-medium">{paper.date}</span>
        <h3 className={`text-lg font-semibold ${isEvent ? "text-amber-800" : ""}`}>{paper.title}</h3>

        {/* On mobile, show the paper card inline */}
        {isMobile && paper.type === "paper" && <PaperCard paper={paper} />}
      </div>
    </div>
  )
}
