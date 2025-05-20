export interface Item {
  id?: number
  date: string
  title: string
  authors?: string
  link?: string
  summary?: string
  keyTakeaways?: string
  start?: number
  end?: number
  type: "paper" | "event"
}
