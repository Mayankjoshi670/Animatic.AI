import type React from "react"
import type { FileType } from "../types"
import "./FileExplorer.css"

interface FileExplorerProps {
  activeFile: FileType
  onFileSelect: (file: FileType) => void
}

const files: { name: FileType; icon: string }[] = [
  { name: "index.html", icon: "🌐" },
  { name: "style.css", icon: "🎨" },
  { name: "script.js", icon: "⚡" },
]

const FileExplorer: React.FC<FileExplorerProps> = ({ activeFile, onFileSelect }) => {
  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <span>Files</span>
      </div>
      <div className="file-list">
        {files.map((file) => (
          <div
            key={file.name}
            className={`file-item ${activeFile === file.name ? "active" : ""}`}
            onClick={() => onFileSelect(file.name)}
          >
            <span className="file-icon">{file.icon}</span>
            <span className="file-name">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileExplorer
