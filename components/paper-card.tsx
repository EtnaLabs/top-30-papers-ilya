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

  // Function to check if text has fewer than 30 words
  const hasShortText = (text: string) => {
    if (!text) return false;
    return text.split(/\s+/).filter(word => word.length > 0).length < 30;
  }

  return (
    <Card className="mt-2">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{paper.title}</h3>
          {paper.link && (
            <Button 
              asChild 
              variant="ghost" 
              size="icon" 
              className="ml-2"
            >
              <a href={paper.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>

        {paper.authors && (
          <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
            <div>
              <p>{paper.authors}</p>
            </div>
            <span className="text-sm font-bold bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{paper.date}</span>
          </div>
        )}

        {paper.slides && totalSlides > 0 && (
          <div className="mt-6 border-t pt-4">
            {/* Single slide display */}
            <div className="space-y-6"> 
              {(() => {
                const slide = paper.slides![activeSlideIndex];
                // Check if the current slide has short text
                const isShortText = slide.content ? hasShortText(slide.content) : false;
                
                return (
                  <>
                    {/* Show slide type as title above the slide */}
                    {slide.type && (
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-lg">
                          {slide.type === "summary" ? "Summary" : 
                           slide.type === "keyTakeaways" ? "Key Takeaways" : 
                           slide.title || ""}
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
                    )}
                    <div key={activeSlideIndex}>
                      {slide.type === "image" && slide.imageUrl && (
                        <div className="relative h-60 w-full overflow-hidden rounded-md mb-2">
                          <Image 
                            src={slide.imageUrl} 
                            alt={slide.title || "Slide image"}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      
                      {slide.type === "video" && slide.videoUrl && (
                        <div className="aspect-video mb-2">
                          <iframe
                            src={slide.videoUrl}
                            className="w-full h-full rounded-md"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                      
                      {slide.type === "text" && slide.content && (
                        <p className={isShortText ? "text-3xl" : "text-sm"}>
                          {slide.content}
                        </p>
                      )}
                      
                      {slide.type === "summary" && slide.content && (
                        <div>
                          <p className={isShortText ? "text-3xl" : "text-sm"}>
                            {slide.content}
                          </p>
                        </div>
                      )}
                      
                      {slide.type === "keyTakeaways" && slide.content && (
                        <div>
                          <ul className="list-disc pl-5 space-y-1 text-4xl">
                            {slide.content.split("\n").map((takeaway, idx) => (
                              <li key={idx} className={hasShortText(takeaway) ? "text-3xl" : "text-sm"}>
                                {takeaway.replace(/^\d+\.\s/, "")}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
