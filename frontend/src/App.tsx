
import { useState, useRef } from "react"
import Editor from "@monaco-editor/react"
import ChatPanel from "./components/chatPanel"
import CodeTabs from "./components/CodeTabs"
import LivePreview from "./components/LivePreview"
import Header from "./components/Header"
import ResizablePane from "./components/ResizablePane"
import type { FileType, ChatMessage } from "./types"
import { defaultFiles } from "./defaultContent"
import "./App.css"

function App() {
  const [files, setFiles] = useState<Record<FileType, string>>(defaultFiles)
  const [activeFile, setActiveFile] = useState<FileType>("index.html")
  const [previewKey, setPreviewKey] = useState(0)
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Welcome to v0 Animation Studio! I can help you create amazing animations. Try asking me to create a bouncing ball, a rotating cube, or any other animation you have in mind.",
      timestamp: new Date(),
    },
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setFiles((prev) => ({
        ...prev,
        [activeFile]: value,
      }))
      setPreviewKey((prev) => prev + 1)
    }
  }

  const getLanguage = (fileType: FileType): string => {
    switch (fileType) {
      case "index.html":
        return "html"
      case "style.css":
        return "css"
      case "script.js":
        return "javascript"
      default:
        return "html"
    }
  }

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setIsGenerating(true)

    // Simulate AI response with animation generation
    try {
  const response =  
  // await fetch("/api/generate-animation", {
  await fetch("http://localhost:5000/api/animations/generate",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: message }),
  })

  if (!response.ok) {
    throw new Error("Failed to generate animation")
  }

  const data = await response.json()

  const assistantMessage: ChatMessage = {
    id: (Date.now() + 1).toString(),
    type: "assistant",
    content: data.message || "I've generated a new animation based on your request!",
    timestamp: new Date(),
  }

  // Assuming backend returns files as: { html, css, js }
  setFiles({
    "index.html": data.html || "",
    "style.css": data.css || "",
    "script.js": data.js || "", 
  })
  setPreviewKey((prev) => prev + 1)
  setChatMessages((prev) => [...prev, assistantMessage])
} catch (error) {
  console.error(error)
  const errorMessage: ChatMessage = {
    id: (Date.now() + 2).toString(),
    type: "assistant",
    content: "Sorry, something went wrong. Please try again.",
    timestamp: new Date(),
  }
  setChatMessages((prev) => [...prev, errorMessage])
} finally {
  setIsGenerating(false)
}

  }

  

  if (isPreviewFullscreen) {
    return (
      <div className="fullscreen-preview">
        <LivePreview
          key={previewKey}
          htmlContent={files["index.html"]}
          cssContent={files["style.css"]}
          jsContent={files["script.js"]}
          isFullscreen={true}
          onExitFullscreen={() => setIsPreviewFullscreen(false)}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <ResizablePane
          left={
            <div className="chat-panel">
              <ChatPanel messages={chatMessages} onSendMessage={handleSendMessage} isGenerating={isGenerating} />
            </div>
          }
          center={
            <div className="editor-panel">
              <CodeTabs activeFile={activeFile} onFileSelect={setActiveFile} />
              <div className="editor-container">
                <Editor
                  height="100%"
                  language={getLanguage(activeFile)}
                  value={files[activeFile]}
                  theme="vs-dark"
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: "on",
                    padding: { top: 16, bottom: 16 },
                  }}
                />
              </div>
            </div>
          }
          right={
            <div className="preview-panel">
              <div className="preview-header">
                <span>Live Preview</span>
                <button
                  className="fullscreen-btn"
                  onClick={() => setIsPreviewFullscreen(true)}
                  title="Fullscreen Preview"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
              <LivePreview
                key={previewKey}
                htmlContent={files["index.html"]}
                cssContent={files["style.css"]}
                jsContent={files["script.js"]}
                isFullscreen={false}
                onExitFullscreen={() => {}}
              />
            </div>
          }
          defaultSizes={[30, 40, 30]}
        />
      </div>
    </div>
  )
}

export default App
