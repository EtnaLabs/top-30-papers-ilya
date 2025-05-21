export interface Item {
  id?: number
  order?: number
  date: string
  title: string
  authors?: string
  link?: string
  summary?: string
  keyTakeaways?: string
  start?: number
  end?: number
  type: "paper" | "event"
  slides?: {
    title?: string
    content?: string
    type: "image" | "video" | "text" | "summary" | "keyTakeaways"
    imageUrl?: string
    videoUrl?: string
  }[]
}
