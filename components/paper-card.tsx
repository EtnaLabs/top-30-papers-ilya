import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Item } from "@/lib/types"
import Image from "next/image"

export function PaperCard({ paper }: { paper: Item }) {
  // Extract year from the date
  const year = new Date(paper.date).getFullYear()

  return (
    <Card className="mt-2">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{paper.title}</h3>
          <span className="text-sm font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{year}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{paper.date}</p>

        {paper.authors && (
          <div className="text-sm text-gray-700 mb-4">
            <h4 className="font-semibold mb-1">Authors</h4>
            <p>{paper.authors}</p>
          </div>
        )}

        {paper.summary && (
          <div className="text-sm mb-4">
            <h4 className="font-semibold mb-1">Summary</h4>
            <p>{paper.summary}</p>
          </div>
        )}

        {paper.keyTakeaways && (
          <div className="text-sm mb-4">
            <h4 className="font-semibold mb-1">Key Takeaways</h4>
            <ul className="list-disc pl-5 space-y-1">
              {paper.keyTakeaways.split("\n").map((takeaway, index) => (
                <li key={index}>{takeaway.replace(/^\d+\.\s/, "")}</li>
              ))}
            </ul>
          </div>
        )}

        {paper.slides && paper.slides.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold text-lg mb-3">Slides</h4>
            <div className="space-y-6">
              {paper.slides.map((slide, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  {slide.title && <h5 className="font-medium text-base mb-2">{slide.title}</h5>}
                  
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
                    <p className="text-sm">{slide.content}</p>
                  )}
                  
                  {slide.type === "summary" && slide.content && (
                    <div>
                      <h6 className="text-sm font-medium mb-1">Summary</h6>
                      <p className="text-sm">{slide.content}</p>
                    </div>
                  )}
                  
                  {slide.type === "keyTakeaways" && slide.content && (
                    <div>
                      <h6 className="text-sm font-medium mb-1">Key Takeaways</h6>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {slide.content.split("\n").map((takeaway, idx) => (
                          <li key={idx}>{takeaway.replace(/^\d+\.\s/, "")}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {paper.link && (
        <CardFooter>
          <Button asChild className="w-full">
            <a href={paper.link} target="_blank" rel="noopener noreferrer">
              Read Paper <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
