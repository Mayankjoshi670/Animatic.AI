export type FileType = "index.html" | "style.css" | "script.js"

export interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface FileContent {
  [key: string]: string
}
