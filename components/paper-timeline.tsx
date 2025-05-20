"use client"

import React, { useEffect, useRef, useState } from "react"
import { PaperCard } from "@/components/paper-card"
import type { Item } from "@/lib/types"
import { useInView } from "react-intersection-observer"
import { useMobile } from "@/hooks/use-mobile"

export function PaperTimeline({ papers }: { papers: Item[] }) {
  const [activePaper, setActivePaper] = useState<Item | null>(null)
  const [currentYear, setCurrentYear] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const paperRefs = useRef<Map<string, HTMLDivElement>>(new Map())

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

  // Get unique years from papers and sort chronologically
  const years = [...new Set(papers.map((paper) => new Date(paper.date).getFullYear()))].sort((a, b) => a - b)

  // Navigation functions
  const navigateToPaper = (direction: 'next' | 'prev') => {
    if (!activePaper) return;
    
    // Get only paper type items
    const onlyPapers = papers.filter(p => p.type === "paper");
    const currentIndex = onlyPapers.findIndex(p => p.id === activePaper.id);
    
    if (currentIndex === -1) return;
    
    let targetIndex;
    if (direction === 'next') {
      targetIndex = currentIndex < onlyPapers.length - 1 ? currentIndex + 1 : 0; // Loop to first
    } else {
      targetIndex = currentIndex > 0 ? currentIndex - 1 : onlyPapers.length - 1; // Loop to last
    }
    
    const targetPaper = onlyPapers[targetIndex];
    setActivePaper(targetPaper);
    setCurrentYear(new Date(targetPaper.date).getFullYear());
    
    // Scroll to the paper item
    const targetElement = paperRefs.current.get(targetPaper.id ? String(targetPaper.id) : "");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Create a function to handle paper selection and scrolling
  const handlePaperSelect = (paper: Item) => {
    if (paper.type === "paper") {
      setActivePaper(paper);
      setCurrentYear(new Date(paper.date).getFullYear());
      
      // Scroll the clicked paper into view
      const targetElement = paperRefs.current.get(String(paper.id));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const calculateYearPositions = () => {
    // Keep track of the positions
    const positions: {year: number, position: number}[] = []
    let currentPosition = 1 // Start with a small offset
    
    // Group papers by year for easier processing
    const papersByYear = new Map<number, Item[]>()
    years.forEach(year => {
      papersByYear.set(year, papers.filter(p => {
        const paperYear = new Date(p.date).getFullYear()
        return paperYear === year
      }))
    })
    
    // Process years in order
    for (const year of years) {
      // Mark this year's position
      positions.push({ year, position: currentPosition })
      
      // Get papers for this year
      const yearPapers = papersByYear.get(year) || []
      
      // Add appropriate spacing based on paper type
      for (const paper of yearPapers) {
        // Base spacing for a normal paper/event
        let spacing = 5 // rem
        
        // If it's a range event, add proportional spacing
        if (paper.type === 'event' && paper.start && paper.end) {
          // Calculate months and convert to rems
          const monthsDiff = (paper.end - paper.start) * 12
          const additionalHeight = (monthsDiff * 10) / 16 // 10px per month, convert to rem
          spacing += additionalHeight
        }
        
        // Add spacing for next item
        currentPosition += spacing
      }
    }
    
    return positions
  }
  
  const yearPositions = calculateYearPositions()

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div ref={timelineRef} className="relative flex-1 max-w-full lg:max-w-[35%]">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Timeline items */}
          <div>
            {papers.map((paper, index) => (
              <TimelineItem
                key={paper.id || `event-${index}`}
                paper={paper}
                isActive={activePaper?.id === paper.id}
                onInView={() => {
                  if (paper.type === "paper") {
                    setActivePaper(paper)
                    setCurrentYear(new Date(paper.date).getFullYear())
                  }
                }}
                onSelect={handlePaperSelect}
                prevDate={index > 0 ? papers[index - 1].date : undefined}
                papers={papers}
                index={index}
                ref={(el) => {
                  if (el && paper.id && paper.type === "paper") {
                    paperRefs.current.set(String(paper.id), el);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail box - fixed on desktop, scrolls with content on mobile */}
      {!isMobile && activePaper && activePaper.type === "paper" && (
        <div className="lg:sticky lg:top-8 lg:self-start lg:w-[65%] h-fit">
          <div 
            key={activePaper.id} 
            className="transition-all duration-300 ease-in-out animate-fadeIn"
          >
            {/* Navigation buttons */}
            <div className="flex justify-between mb-4">
              <button 
                onClick={() => navigateToPaper('prev')}
                className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-medium transition-colors"
              >
                <span className="text-lg">←</span> Prev
              </button>
              <button 
                onClick={() => navigateToPaper('next')}
                className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-medium transition-colors"
              >
                Next <span className="text-lg">→</span>
              </button>
            </div>
            
            <PaperCard paper={activePaper} />
          </div>
        </div>
      )}
    </div>
  )
}

interface TimelineItemProps {
  paper: Item;
  isActive: boolean;
  onInView: () => void;
  onSelect: (paper: Item) => void;
  prevDate?: string;
  papers: Item[];
  index: number;
}

// Modify the TimelineItem to accept ref
const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(({
  paper,
  isActive,
  onInView,
  onSelect,
  prevDate,
  papers,
  index,
}, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.6,
    triggerOnce: false,
    rootMargin: "-30% 0px -30% 0px",
  })
  const isMobile = useMobile()

  // Combine refs
  const setRefs = (element: HTMLDivElement | null) => {
    // Set the ref from props
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
    // Set the inView ref
    inViewRef(element);
  };

  useEffect(() => {
    if (inView && paper.type === "paper") {
      onInView();
    }
  }, [inView, onInView, paper.type, paper])

  // Calculate the gap based on the time difference between this paper and the previous one
  const getTimeGap = () => {
    if (!prevDate) return 0 // First item has no gap

    const currentDate = new Date(paper.date)
    const previousDate = new Date(prevDate)

    // Calculate months difference
    const monthsDiff =
      (currentDate.getFullYear() - previousDate.getFullYear()) * 12 + (currentDate.getMonth() - previousDate.getMonth())

    // Use different scaling based on the year
    // For papers after 2004, use a larger scale factor to show more detail
    const isAfter2004 = currentDate.getFullYear() > 2004;
    
    // Scale factor - adjust this to control the overall spacing
    // Higher scale factor for papers after 2004
    const scaleFactor = isAfter2004 ? 3.0 : 0.8;

    // Base gap (minimum spacing) in rem
    const baseGap = 3

    // Calculate the gap in rem, with a minimum of baseGap
    return baseGap + monthsDiff * scaleFactor
  }

  // Calculate the height of the event if it has start and end years
  const getEventHeight = () => {
    if (paper.type !== "event" || !paper.start || !paper.end) return "auto";
    
    // Get start and end years
    const startYear = paper.start;
    const endYear = paper.end;
    
    // Calculate total months between start and end
    const totalMonths = (endYear - startYear) * 12;
    
    // Define pixels per month - this is the key scaling factor
    // We use a more moderate scaling to ensure timeline remains usable
    const pixelsPerMonth = 10; // 10px per month (120px per year)
    
    // Calculate height in pixels based on months
    const heightInPixels = Math.max(100, totalMonths * pixelsPerMonth);
    
    return `${heightInPixels}px`;
  };

  const timeGap = getTimeGap()
  const eventHeight = getEventHeight()

  // Different styling for events vs papers
  const isEvent = paper.type === "event"
  const isRangeEvent = isEvent && paper.start && paper.end;

  // Safely get start and end years (fixing TypeScript errors)
  const startYear = paper.start ?? 0;
  const endYear = paper.end ?? 0;

  return (
    <div
      ref={setRefs}
      className="relative pl-10"
      style={{
        marginTop: `${timeGap}rem`,
      }}
    >
      {/* Timeline dot */}
      {!isRangeEvent && (
        <div
          className={`absolute left-[16px] top-6 w-3 h-3 rounded-full border-2 border-white z-10 transform -translate-x-1/2 -translate-y-1/2 ${
            isEvent ? "bg-amber-500" : isActive ? "bg-blue-500 ring-4 ring-blue-200" : "bg-gray-300"
          }`}
        />
      )}
      {/* For range events, add a vertical line to show duration */}
      {isRangeEvent && (
        <div 
          className="absolute left-[17px] w-1 bg-amber-500 rounded-full" 
          style={{
            top: "0.75rem",
            height: eventHeight,
            transform: "translateX(-50%)",
            opacity: 0.8,
            boxShadow: "0 0 4px rgba(245, 158, 11, 0.5)"
          }}
        />
      )}

      <div 
        className={`space-y-1 ${
          isEvent 
            ? "bg-amber-50 p-3 rounded-md border border-amber-200" 
            : isActive && !isEvent 
              ? "bg-blue-50 p-3 rounded-md border border-blue-200 shadow-md transition-all duration-300" 
              : "p-3"
        } ${!isEvent ? "cursor-pointer hover:bg-gray-50 transition-colors" : ""}`}
        style={{
          minHeight: isRangeEvent ? eventHeight : "auto",
          display: "flex",
          flexDirection: "column"
        }}
        onClick={() => {
          if (paper.type === "paper") {
            onSelect(paper);
          }
        }}
      >
        <span className="text-sm text-gray-500 font-medium">
          {isRangeEvent ? (
            <>
              <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                {startYear} - {endYear}
              </span>
              <span className="ml-2 text-amber-700">
                ({endYear - startYear} years)
              </span>
            </>
          ) : (
            paper.date
          )}
        </span>
        <h3 className={`text-lg font-semibold ${isEvent ? "text-amber-800" : isActive ? "text-blue-700 transition-all duration-300" : ""}`}>{paper.title}</h3>

        {/* On mobile, show the paper card inline */}
        {isMobile && paper.type === "paper" && <PaperCard paper={paper} />}
      </div>
    </div>
  )
})

// Add display name
TimelineItem.displayName = "TimelineItem";
