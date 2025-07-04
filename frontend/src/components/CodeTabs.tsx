import type { FileType } from "../types"
import "./CodeTabs.css"

interface CodeTabsProps {
  activeFile: FileType
  onFileSelect: (file: FileType) => void
}

const files: { name: FileType; label: string; icon: string }[] = [
  { name: "index.html", label: "index.html", icon: "🌐" },
  { name: "style.css", label: "style.css", icon: "🎨" },
  { name: "script.js", label: "script.js", icon: "⚡" },
]

const CodeTabs = ({ activeFile, onFileSelect }: CodeTabsProps) => {
  return (
    <div className="code-tabs">
      <div className="tabs-container">
        {files.map((file) => (
          <button
            key={file.name}
            className={`tab ${activeFile === file.name ? "active" : ""}`}
            onClick={() => onFileSelect(file.name)}
          >
            <span className="tab-icon">{file.icon}</span>
            <span className="tab-label">{file.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CodeTabs
