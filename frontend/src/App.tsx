
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
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I've generated a new animation based on your request! Check the preview panel to see the result.",
        timestamp: new Date(),
      }

      // Generate simple animation based on keywords
      const generatedFiles = generateAnimationFromPrompt(message)
      setFiles(generatedFiles)
      setPreviewKey((prev) => prev + 1)

      setChatMessages((prev) => [...prev, assistantMessage])
      setIsGenerating(false)
    }, 2000)
  }

  const generateAnimationFromPrompt = (prompt: string): Record<FileType, string> => {
    const lowerPrompt = prompt.toLowerCase()

    if (lowerPrompt.includes("ball") || lowerPrompt.includes("bounce")) {
      return {
        "index.html": `<div class="container">
  <div class="bouncing-ball"></div>
  <h1>Bouncing Ball Animation</h1>
</div>`,
        "style.css": `body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
}

.bouncing-ball {
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at 30% 30%, #ff6b6b, #ee5a52);
  border-radius: 50%;
  animation: bounce 1.5s infinite ease-in-out;
  margin-bottom: 2rem;
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-100px);
  }
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin: 0;
}`,
        "script.js": `console.log('Bouncing ball animation loaded!');

document.addEventListener('DOMContentLoaded', function() {
  const ball = document.querySelector('.bouncing-ball');
  
  ball.addEventListener('click', function() {
    this.style.animationDuration = '0.5s';
    setTimeout(() => {
      this.style.animationDuration = '1.5s';
    }, 2000);
  });
});`,
      }
    }

    if (lowerPrompt.includes("cube") || lowerPrompt.includes("rotate")) {
      return {
        "index.html": `<div class="container">
  <div class="rotating-cube">
    <div class="face front">1</div>
    <div class="face back">2</div>
    <div class="face right">3</div>
    <div class="face left">4</div>
    <div class="face top">5</div>
    <div class="face bottom">6</div>
  </div>
  <h1>3D Rotating Cube</h1>
</div>`,
        "style.css": `body {
  margin: 0;
  padding: 0;
  background: linear-gradient(45deg, #1a1a2e, #16213e, #0f3460);
  font-family: Arial, sans-serif;
  perspective: 1000px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
}

.rotating-cube {
  width: 100px;
  height: 100px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotate 4s infinite linear;
  margin-bottom: 2rem;
}

.face {
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #00d4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: #00d4ff;
  backdrop-filter: blur(10px);
}

.front { transform: rotateY(0deg) translateZ(50px); }
.back { transform: rotateY(180deg) translateZ(50px); }
.right { transform: rotateY(90deg) translateZ(50px); }
.left { transform: rotateY(-90deg) translateZ(50px); }
.top { transform: rotateX(90deg) translateZ(50px); }
.bottom { transform: rotateX(-90deg) translateZ(50px); }

@keyframes rotate {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin: 0;
}`,
        "script.js": `console.log('3D Cube animation loaded!');

document.addEventListener('DOMContentLoaded', function() {
  const cube = document.querySelector('.rotating-cube');
  
  cube.addEventListener('click', function() {
    this.style.animationDuration = '1s';
    setTimeout(() => {
      this.style.animationDuration = '4s';
    }, 3000);
  });
});`,
      }
    }

    // Default response for other prompts
    return {
      "index.html": `<div class="container">
  <div class="animated-element">
    <div class="pulse-circle"></div>
  </div>
  <h1>Custom Animation</h1>
  <p>Generated from: "${prompt}"</p>
</div>`,
      "style.css": `body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
  text-align: center;
}

.animated-element {
  margin-bottom: 2rem;
}

.pulse-circle {
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #ff6b6b, #ee5a52);
  border-radius: 50%;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  opacity: 0.8;
}`,
      "script.js": `console.log('Custom animation generated!');

document.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector('.pulse-circle');
  
  element.addEventListener('click', function() {
    this.style.background = 'radial-gradient(circle, #4ecdc4, #44a08d)';
    setTimeout(() => {
      this.style.background = 'radial-gradient(circle, #ff6b6b, #ee5a52)';
    }, 1000);
  });
});`,
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
