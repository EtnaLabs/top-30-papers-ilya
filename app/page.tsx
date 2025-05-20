import { PaperTimeline } from "@/components/paper-timeline"
import { getPapers } from "@/lib/data"

export default async function Home() {
  const papers = await getPapers()

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Ilya Sutskever&apos;s Top 30 AI Papers</h1>
        <p className="mt-2 text-gray-500 max-w-3xl mx-auto">
          Ilya Sutskever shared a list of 30 papers with John Carmack and said, &quot;If you really learn all of these,
          you&apos;ll know 90% of what matters today&quot;. Below we will review these papers/resources.
        </p>
      </div>

      <PaperTimeline papers={papers} />
    </div>
  )
}
