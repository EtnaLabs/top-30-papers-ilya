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
  const [selectedPaper, setSelectedPaper] = useState<Item | null>(null)
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
  const MIN_ITEM_SPACING = 35; // rem
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

      // Always select the first item in the papers array, regardless of type
      if (papers.length > 0) {
        const firstItem = papers[0];
        setActivePaper(firstItem);
        setSelectedPaper(firstItem);
        setCurrentYear(new Date(firstItem.date).getFullYear());
        
        // Scroll to the top of the timeline
        if (timelineRef.current) {
          // First make sure we're at the top of the page
          window.scrollTo(0, 0);
          
          // Then scroll the first item into view if it exists
          const firstItemElement = paperRefs.current.get(String(firstItem.id));
          if (firstItemElement) {
            setTimeout(() => {
              firstItemElement.scrollIntoView({ behavior: 'auto', block: 'start' });
            }, 100); // Small delay to ensure DOM is ready
          }
        }
      }
    }
  }, [papers])

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
        // For Ilya's order, base the cursor year on which item is currently in view
        const nearestItem = findNearestVisibleItem();
        if (nearestItem) {
          const itemDate = new Date(nearestItem.date);
          setCursorYear(itemDate.getFullYear() + itemDate.getMonth()/12);
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
    
    // Helper function to find the nearest item to viewport center
    const findNearestVisibleItem = () => {
      if (!timelineRef.current || papers.length === 0) return null;
      
      // Use activePaper if available
      if (activePaper) {
        return activePaper;
      }
      
      // Fallback to first item
      return papers[0];
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
    if (!selectedPaper) return;
    
    // Get all items (both papers and events)
    const currentIndex = papers.findIndex(p => p.id === selectedPaper.id);
    
    if (currentIndex === -1) return;
    
    let targetIndex;
    if (direction === 'next') {
      targetIndex = (currentIndex + 1) % papers.length;
    } else {
      targetIndex = (currentIndex - 1 + papers.length) % papers.length;
    }
    
    const targetPaper = papers[targetIndex];
    
    // Update the selected paper in the timeline
    setSelectedPaper(targetPaper);
    setCurrentYear(new Date(targetPaper.date).getFullYear());
    
    // Scroll to the target element
    const targetElement = document.getElementById(`item-${targetIndex}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateToPaper('prev');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateToPaper('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePaper, papers]);

  // Create a function to handle item selection and scrolling
  const handlePaperSelect = (paper: Item) => {
    // Set both the selected and active papers
    setSelectedPaper(paper);
    setActivePaper(paper);
    setCurrentYear(new Date(paper.date).getFullYear());
    
    // Scroll the clicked item into view
    const targetElement = paperRefs.current.get(String(paper.id));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                isActive={selectedPaper?.title === paper.title}
                onInView={() => {
                  setActivePaper(paper)
                  setCurrentYear(new Date(paper.date).getFullYear())
                }}
                onSelect={handlePaperSelect}
                getPosition={getAbsolutePosition}
                papers={papers}
                index={index}
                isIlyaOrder={isIlyaOrder}
                ref={(el) => {
                  if (el && paper.id) {
                    paperRefs.current.set(String(paper.id), el);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail box - show in all views, not just Ilya's order mode */}
      {!isMobile && activePaper && (
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
  const isMobile = useMobile()
  const { ref: intersectionRef, inView } = useInView({
    threshold: 0.1, // Small threshold to trigger when item starts appearing
    rootMargin: '0px 0px -80% 0px', // Only trigger when item is near the top
    delay: 100, // Add small delay to prevent rapid updates
  });

  // Get absolute position in rem units for this item
  const position = getPosition(paper.date, index);

  // Different styling for events vs papers
  const isEvent = paper.type === "event"

  // Get item color
  const getItemColor = () => {
    if (isEvent) return "amber";
    return "blue";
  }
  
  const itemColor = getItemColor();
  const itemId = `item-${index}`;

  // Call onInView when the item becomes visible, with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (inView) {
      timeoutId = setTimeout(() => {
        onInView();
      }, 50); // Small debounce to prevent rapid updates
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [inView, onInView]);

  return (
    <div
      ref={(el) => {
        // Combine both refs
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
        intersectionRef(el);
      }}
      id={itemId}
      className="relative pl-8"
      style={{
        position: 'absolute',
        top: `${position}rem`,
        left: 0,
        right: 0,
      }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-6 w-3 h-3 rounded-full border-2 border-white z-10 transform -translate-x-1/2 -translate-y-1/2 ${
          isEvent 
            ? isActive 
              ? "bg-amber-500 ring-4 ring-amber-200" 
              : "bg-amber-400"
            : isActive 
              ? "bg-blue-500 ring-4 ring-blue-200" 
              : "bg-blue-400"
        }`}
      />

      <div 
        className={`space-y-1 p-3 ${
          isActive 
            ? isEvent
              ? "bg-amber-50 rounded-md border border-amber-200 shadow-md transition-all duration-300" 
              : "bg-blue-50 rounded-md border border-blue-200 shadow-md transition-all duration-300"
            : "hover:bg-gray-50 transition-colors"
        } cursor-pointer transition-colors`}
        onClick={() => {
          onSelect(paper);
        }}
      >
        <span className="text-sm text-gray-500 font-medium">
          {paper.date}
        </span>
        <h3 className={`text-lg font-semibold ${
          isEvent 
            ? isActive ? "text-amber-700" : "text-gray-800"
            : isActive ? "text-blue-700" : "text-gray-800"
        }`}>
          {paper.title}
        </h3>
        
        {/* Show authors for papers */}
        {paper.type === "paper" && paper.authors && (
          <p className="text-sm text-gray-600 mt-1 font-light">{paper.authors}</p>
        )}

        {/* On mobile, show the paper card inline */}
        {isMobile && paper.type === "paper" && <PaperCard paper={paper} />}
      </div>
    </div>
  )
})

// Add display name
TimelineItem.displayName = "TimelineItem";