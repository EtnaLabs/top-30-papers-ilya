"use client"

import React, { useEffect, useRef, useState, useMemo } from "react"
import { PaperCard } from "@/components/paper-card"
import type { Item } from "@/lib/types"
import { useInView } from "react-intersection-observer"
import { useMobile } from "@/hooks/use-mobile"
import { ExternalLink } from "lucide-react"

// Type for tracking closest papers to viewport center
type ClosestPaper = {
  paper: Item;
  distance: number;
  element: HTMLDivElement;
};

export function PaperTimeline({ papers }: { papers: Item[] }) {
  const [activePaper, setActivePaper] = useState<Item | null>(null)
  const [currentYear, setCurrentYear] = useState<number | null>(null)
  const [cursorYear, setCursorYear] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const paperRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  // Reference for the timeline line
  const timelineLineRef = useRef<HTMLDivElement>(null)
  // Reference to track total timeline height
  const timelineHeightRef = useRef<number>(0)
  // Calculate and store the first date once
  const firstDateRef = useRef<Date | null>(null)
  // Store calculated positions to prevent overlapping
  const itemPositionsRef = useRef<Map<string, number>>(new Map())
  // Minimum spacing between items in rem
  const MIN_ITEM_SPACING = 15; // rem
  // Check if using Ilya's order (papers with no gaps between them)
  const isIlyaOrder = useMemo(() => {
    // We can detect this by checking if papers are sorted by date
    // If not sorted by date, assume it's Ilya's order
    if (papers.length <= 1) return false;
    
    // Check only paper items (ignore events)
    const paperItems = papers.filter(p => p.type === "paper");
    if (paperItems.length <= 1) return false;
    
    for (let i = 1; i < paperItems.length; i++) {
      if (new Date(paperItems[i].date) < new Date(paperItems[i-1].date)) {
        // Found an item out of date order, so this is likely Ilya's order
        return true;
      }
    }
    
    return false;
  }, [papers]);

  // Set the first paper as active by default and calculate the first date
  useEffect(() => {
    if (papers.length > 0) {
      // Sort items chronologically to find the absolute first date
      const sortedByDate = [...papers].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      // Set the first date as reference for all positioning
      if (sortedByDate.length > 0) {
        const firstDate = new Date(sortedByDate[0].date);
        firstDateRef.current = firstDate;
        const year = firstDate.getFullYear();
        const month = firstDate.getMonth();
        setCursorYear(year + month/12);
        
        // Set current year even if the first item is an event
        if (sortedByDate[0].type === "event") {
          setCurrentYear(year);
        }
      }

      // Find the first paper (for activation) - only if no paper is already active
      if (!activePaper && papers.some((p) => p.type === "paper")) {
        const firstPaper = papers.find((p) => p.type === "paper")
        if (firstPaper) {
          setActivePaper(firstPaper)
          setCurrentYear(new Date(firstPaper.date).getFullYear())
        }
      }
    }
  }, [papers, activePaper])

  // Calculate absolute position based on date or sequence in Ilya's order
  const getAbsolutePosition = (date: string, index: number) => {
    if (isIlyaOrder) {
      // In Ilya's order, just space items equally
      // Only consider paper items for positioning, not events
      const paperItems = papers.filter(p => p.type === "paper");
      const paperIndex = paperItems.findIndex(p => p.date === date);
      
      // For papers, position based on their order in the papers list
      if (paperIndex !== -1) {
        return paperIndex * MIN_ITEM_SPACING + 1; // +1 for initial offset
      }
      
      // For events in Ilya's order, position them near related papers based on date
      const itemDate = new Date(date);
      const closestPaper = paperItems.reduce(
        (closest, paper) => {
          const paperDate = new Date(paper.date);
          const distance = Math.abs(paperDate.getTime() - itemDate.getTime());
          if (distance < closest.distance) {
            return { paper, distance, position: paperItems.indexOf(paper) };
          }
          return closest;
        },
        { paper: paperItems[0], distance: Infinity, position: 0 }
      );
      
      // Position the event near the closest paper
      return closestPaper.position * MIN_ITEM_SPACING + 0.5; // Slight offset from the closest paper
    }
  
    if (!firstDateRef.current) return 0;
    
    const itemDate = new Date(date);
    const itemId = `item-${index}`;
    
    // If position was already calculated, return it
    if (itemPositionsRef.current.has(itemId)) {
      return itemPositionsRef.current.get(itemId)!;
    }
    
    const firstDate = firstDateRef.current;
    
    // Calculate base position using date
    const monthsDiff = 
      (itemDate.getFullYear() - firstDate.getFullYear()) * 12 + 
      (itemDate.getMonth() - firstDate.getMonth());
    
    // Add days within the month (approximate)
    const daysInMonth = new Date(itemDate.getFullYear(), itemDate.getMonth() + 1, 0).getDate();
    const daysFraction = itemDate.getDate() / daysInMonth;
    
    // Initial position based on date
    let position = monthsDiff + daysFraction;
    
    // Adjust position to prevent overlapping with previous items
    if (index > 0) {
      const prevItemId = `item-${index - 1}`;
      
      if (itemPositionsRef.current.has(prevItemId)) {
        const prevPosition = itemPositionsRef.current.get(prevItemId)!;
        const minPosition = prevPosition + MIN_ITEM_SPACING;
        
        // If this position would overlap with previous item, place it after
        if (position < minPosition) {
          position = minPosition;
        }
      }
    }
    
    // Store the calculated position
    itemPositionsRef.current.set(itemId, position);
    
    return position;
  };

  // Calculate the total height of the timeline
  useEffect(() => {
    if (timelineRef.current) {
      // Measure the total height
      const timelineHeight = timelineRef.current.scrollHeight;
      timelineHeightRef.current = timelineHeight;
    }
  }, [papers]);

  // Update cursor year based on scroll position
  useEffect(() => {
    const updateCursorYear = () => {
      if (!timelineRef.current || !firstDateRef.current) return;
      
      // Get first date as our reference point
      const firstDate = firstDateRef.current;
      
      // Get timeline position
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const scrollTop = -timelineRect.top; // How far we've scrolled past the top
      
      // Calculate scrollTop in rem units
      const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
      const scrollTopRem = scrollTop / rootFontSize;
      
      // Use different approach for different views
      if (isIlyaOrder) {
        // For Ilya's order, base the cursor year on which paper is currently in view
        const nearestPaper = findNearestVisiblePaper();
        if (nearestPaper) {
          const paperDate = new Date(nearestPaper.date);
          setCursorYear(paperDate.getFullYear() + paperDate.getMonth()/12);
        }
      } else {
        // Convert scroll position to months (1rem = 1 month)
        const monthsScrolled = scrollTopRem / 1;
        
        // Calculate the date at this position
        const targetDate = new Date(firstDate);
        targetDate.setMonth(firstDate.getMonth() + monthsScrolled);
        
        // Set cursor year
        const year = targetDate.getFullYear();
        const month = targetDate.getMonth();
        setCursorYear(year + month/12);
      }
    };
    
    // Helper function to find the nearest paper to viewport center
    const findNearestVisiblePaper = () => {
      if (!timelineRef.current || papers.length === 0) return null;
      
      // Get only paper items
      const paperItems = papers.filter(p => p.type === "paper");
      if (paperItems.length === 0) return null;
      
      // Use activePaper if available
      if (activePaper && activePaper.type === "paper") {
        return activePaper;
      }
      
      // Fallback to first paper
      return paperItems[0];
    };
    
    // Call initially
    updateCursorYear();
    
    // Update on scroll
    window.addEventListener('scroll', updateCursorYear);
    return () => window.removeEventListener('scroll', updateCursorYear);
  }, [papers, activePaper, isIlyaOrder]);

  // Format the cursor year to show year and month
  const formatCursorDate = () => {
    if (!cursorYear) return "";
    
    const year = Math.floor(cursorYear);
    const monthDecimal = cursorYear - year;
    const month = Math.round(monthDecimal * 12); // Convert from decimal (0.08, 0.16, etc) to month index (0-11)
    
    // Convert month number to name
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const monthName = monthNames[month] || monthNames[0];
    
    return `${monthName} ${year}`;
  };

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
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Calculate total height needed for the timeline
  const calculateTimelineHeight = () => {
    if (papers.length === 0) return 0;
    
    // If we have positions calculated, use the last item's position + padding
    if (itemPositionsRef.current.size > 0) {
      const lastItemId = `item-${papers.length - 1}`;
      if (itemPositionsRef.current.has(lastItemId)) {
        return itemPositionsRef.current.get(lastItemId)! + 30; // Add padding
      }
    }
    
    // Fallback: calculate based on total months
    if (!firstDateRef.current) return papers.length * MIN_ITEM_SPACING;
    
    const sortedPapers = [...papers].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const lastDate = new Date(sortedPapers[0].date);
    const firstDate = firstDateRef.current;
    
    const totalMonths = 
      (lastDate.getFullYear() - firstDate.getFullYear()) * 12 + 
      (lastDate.getMonth() - firstDate.getMonth());
    
    // Use either date-based calculation or fixed spacing, whichever is larger
    return Math.max(totalMonths + 20, papers.length * MIN_ITEM_SPACING);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div ref={timelineRef} className={`relative flex-1 max-w-full lg:max-w-[20%] -ml-5`}>
        <div className="relative">
          {/* Timeline line */}
          <div ref={timelineLineRef} className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Fixed date indicator at the top that stays visible when scrolling */}
          {cursorYear && !isIlyaOrder && (
            <div className="sticky top-0 z-20 pointer-events-none pt-4 pb-2">
              <div className="absolute left-0 transform -translate-x-1/2 flex flex-col items-center">
                <div className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-full mt-1 shadow-sm">
                  {formatCursorDate()}
                </div>
              </div>
            </div>
          )}

          {/* Timeline items with absolute positioning */}
          <div 
            className="pt-16 relative" 
            style={{ 
              height: `${calculateTimelineHeight()}rem`
            }}
          >
            {papers.map((paper, index) => (
              <TimelineItem
                key={paper.id || `event-${index}`}
                paper={paper}
                isActive={activePaper?.title === paper.title}
                onInView={() => {
                  if (paper.type === "paper") {
                    setActivePaper(paper)
                    setCurrentYear(new Date(paper.date).getFullYear())
                  }
                }}
                onSelect={handlePaperSelect}
                getPosition={getAbsolutePosition}
                papers={papers}
                index={index}
                isIlyaOrder={isIlyaOrder}
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

      {/* Detail box - show in all views, not just Ilya's order mode */}
      {!isMobile && activePaper && activePaper.type === "paper" && (
        <div className="lg:sticky lg:top-8 lg:self-start lg:w-[80%] h-fit">
          <div 
            key={activePaper.id} 
            className="transition-all duration-300 ease-in-out animate-fadeIn"
          >
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
  getPosition: (date: string, index: number) => number;
  papers: Item[];
  index: number;
  isIlyaOrder: boolean;
}

// Modify the TimelineItem to accept ref
const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(({
  paper,
  isActive,
  onInView,
  onSelect,
  getPosition,
  papers,
  index,
  isIlyaOrder,
}, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: "-10px 0px -90% 0px", // Changed to detect when paper is near the top of viewport
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
    if (inView) {
      // Only trigger onInView for paper types, but still track visibility for events
      if (paper.type === "paper") {
        onInView();
      }
    }
  }, [inView, onInView, paper.type, paper])

  // Get absolute position in rem units for this item
  const position = getPosition(paper.date, index);

  // Calculate the height of the event if it has start and end years
  const getEventHeight = () => {
    if (paper.type !== "event" || !paper.start || !paper.end) return "auto";
    
    // Get start and end years
    const startYear = paper.start;
    const endYear = paper.end;
    
    // Calculate total months between start and end
    const totalMonths = (endYear - startYear) * 12;
    
    // Use a scaling factor that works well with the timeline spacing
    const heightInRem = Math.max(totalMonths * 0.4, 8); // Ensure minimum height for visibility
    
    return `${heightInRem}rem`;
  };

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
      className="relative pl-8"
      style={{
        position: 'absolute',
        top: `${position}rem`,
        left: 0,
        right: 0,
      }}
    >
      {/* Timeline dot */}
      {!isRangeEvent && (
        <div
          className={`absolute left-0 top-6 w-3 h-3 rounded-full border-2 border-white z-10 transform -translate-x-1/2 -translate-y-1/2 ${
            isEvent ? "bg-amber-500" : isActive ? "bg-blue-500 ring-4 ring-blue-200" : "bg-gray-300"
          }`}
        />
      )}
      {/* For range events, add a vertical line to show duration */}
      {isRangeEvent && (
        <div 
          className="absolute left-0 w-2 bg-amber-500 rounded-full" 
          style={{
            top: "0.75rem",
            height: eventHeight,
            transform: "translateX(-50%)",
            opacity: 0.7,
            boxShadow: "0 0 6px rgba(245, 158, 11, 0.6)"
          }}
        >
          {/* Small dots at start and end of timeline */}
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-amber-600 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-amber-600 rounded-full transform -translate-x-1/2 translate-y-1/2" />
        </div>
      )}

      <div 
        className={`space-y-1 ${
          isEvent 
            ? "bg-amber-50 p-3 rounded-md border border-amber-200" 
            : isActive 
              ? "bg-blue-50 p-3 rounded-md border border-blue-200 shadow-md transition-all duration-300" 
              : "p-3 hover:bg-gray-50 transition-colors"
        } ${!isEvent ? "cursor-pointer transition-colors" : ""}`}
        style={{
          minHeight: isRangeEvent ? eventHeight : "auto",
          display: "flex",
          flexDirection: "column"
        }}
        onClick={() => {
          // For papers, select them and scroll to view
          if (paper.type === "paper") {
            onSelect(paper);
          } 
          // For events, just highlight them but don't change the active paper
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
        <h3 className={`text-lg font-semibold ${isEvent ? "text-amber-800" : isActive ? "text-blue-700" : "text-gray-800"}`}>{paper.title}</h3>
        
        {/* Show authors for both views */}
        {paper.type === "paper" && paper.authors && (
          <p className="text-sm text-gray-600 mt-1 font-light">{paper.authors}</p>
        )}

        {/* On mobile, show the paper card inline regardless of view mode */}
        {isMobile && paper.type === "paper" && <PaperCard paper={paper} />}
      </div>
    </div>
  )
})

// Add display name
TimelineItem.displayName = "TimelineItem";