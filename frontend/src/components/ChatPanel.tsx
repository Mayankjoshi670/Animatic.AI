 
import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles } from "lucide-react"
import type { ChatMessage } from "../types"
import AnimationLoader from "./AnimationLoader"
import "./ChatPanel.css"

interface ChatPanelProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
  isGenerating: boolean
}

const ChatPanel = ({ messages, onSendMessage, isGenerating }: ChatPanelProps) => {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isGenerating) {
      onSendMessage(inputValue.trim())
      setInputValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const suggestedPrompts = [
    "Create a bouncing ball animation",
    "Make a rotating 3D cube",
    "Design a loading spinner",
    "Build a particle system",
    "Create a morphing shape",
  ]

  const loadingMessages = [
    "Crafting your animation magic...",
    "Mixing colors and motion...",
    "Bringing pixels to life...",
    "Weaving animation spells...",
    "Creating visual poetry...",
    "Animating your imagination...",
  ]

  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(loadingMessages[0])

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isGenerating])

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-title">
          <Sparkles size={16} />
          <span>Animation Assistant</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">{message.type === "assistant" ? "🤖" : "👤"}</div>
            <div className="message-content">
              <div className="message-text">{message.content}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="message assistant generating">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <AnimationLoader message={currentLoadingMessage} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

    {messages.length > 0 && !isGenerating && inputValue.trim() === "" && (
        <div className="suggested-prompts">
          <div className="prompts-title">Try these prompts:</div>
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              className="prompt-suggestion"
              onClick={() => !isGenerating && onSendMessage(prompt)}
              disabled={isGenerating}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the animation you want to create..."
            className="chat-input"
            rows={1}
            disabled={isGenerating}
          />
          <button
            type="submit"
            className={`send-button ${isGenerating ? "generating" : ""}`}
            disabled={!inputValue.trim() || isGenerating}
          >
            {isGenerating ? (
              <div className="button-loader">
                <div className="spinner"></div>
              </div>
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatPanel
