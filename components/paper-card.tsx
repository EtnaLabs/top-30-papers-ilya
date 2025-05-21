import React, { useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import type { Item } from "@/lib/types"
import Image from "next/image"
import { useState } from "react"

export function PaperCard({ paper }: { paper: Item }) {
  // Extract year from the date
  const year = new Date(paper.date).getFullYear()
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const totalSlides = paper.slides?.length || 0
  const isEvent = paper.type === "event"

  // Reset to first slide whenever the paper changes
  useEffect(() => {
    setActiveSlideIndex(0);
  }, [paper]);

  const handleNextSlide = () => {
    setActiveSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const handlePrevSlide = () => {
    setActiveSlideIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  // Function to check if text has fewer than 50 words
  const hasShortText = (text: string) => {
    if (!text) return false;
    return text.split(/\s+/).filter(word => word.length > 0).length < 100;
  }

  // If there are no slides but we have a summary, create a slide from the summary
  const displaySlides = paper.slides || [];

  return (
    <Card className="mt-2 border-0 shadow-none">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className={`text-4xl font-bold tracking-tight leading-tight mr-10 ${isEvent ? "text-amber-700" : "text-blue-700"}`}>
            {paper.title}
          </h3>
          {paper.link && (
            <Button 
              asChild 
              variant="ghost" 
              size="icon" 
              className="ml-2 mt-2"
            >
              <a href={paper.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>

        {/* Always show date info for both types */}
        <div className="flex justify-between items-center mb-4">
          <div>
            {paper.authors && (
              <p className="text-base font-light tracking-wide">{paper.authors}</p>
            )}
            {/* For events with start/end years, show the range */}
            {isEvent && paper.start && paper.end && (
              <p className="text-base font-light">
                <span className="font-medium">Time period:</span> {paper.start} - {paper.end} ({paper.end - paper.start} years)
              </p>
            )}
          </div>
          <span className={`text-base font-semibold px-3 py-1.5 rounded-full ${
            isEvent ? "bg-amber-50 text-amber-800" : "bg-gray-100 text-gray-800"
          }`}>
            {paper.date}
          </span>
        </div>

        {/* Display slides for both types if available */}
        {displaySlides.length > 0 && (
          <div className="mt-6 border-t pt-4">
            {/* Single slide display */}
            <div className="space-y-6"> 
              {(() => {
                const slide = displaySlides[activeSlideIndex];
                // Check if the current slide has short text
                const isShortText = slide?.content ? hasShortText(slide.content) : false;
                
                return (
                  <>
                    {/* Show slide navigation if there are multiple slides */}
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-lg text-gray-700">
                      </h5>
                      
                      {/* Navigation buttons moved next to title */}
                      {totalSlides > 1 && (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handlePrevSlide}
                            aria-label="Previous slide"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span className="text-sm text-gray-600">
                            {activeSlideIndex + 1} of {totalSlides}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleNextSlide}
                            aria-label="Next slide"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div key={activeSlideIndex}>
                      <div>
                        {slide?.title && (
                          <p className="font-medium text-4xl text-gray-700 mb-20">
                            {slide.title}
                          </p>
                        )}
                        {slide?.content && (
                          <p className={isShortText ? "text-3xl font-light leading-relaxed tracking-wide" : "text-base leading-relaxed"}>
                            {slide.content}
                          </p>
                        )}
                        {slide?.bullets && (
                          <ul className="list-disc pl-5 space-y-2">
                            {slide.bullets.map((bullet, idx) => (
                              <li className="text-3xl font-light leading-relaxed tracking-wide" key={idx}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                        {slide?.imageUrl && (
                          <div className="relative mt-4">
                            <Image 
                              src={slide.imageUrl} 
                              alt={slide.title || "Slide image"}
                              width={800}
                              height={450}
                              className="rounded-md"
                            />
                          </div>
                        )}
                        {slide?.videoUrl && (
                          <div className="aspect-video mt-4">
                            <iframe
                              src={slide.videoUrl}
                              className="w-full h-full rounded-md"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
