import { Download, Github, Share } from "lucide-react"
import "./Header.css"

const Header = () => {
  const downloadAsZip = async () => {
    // This would be implemented with the actual file contents
    console.log("Download ZIP functionality")
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">v0</div>
          <span className="logo-text">Animation Studio</span>
        </div>
      </div>

      <div className="header-center">
        <div className="breadcrumb">
          <span className="breadcrumb-item">Animation Editor</span>
        </div>
      </div>

      <div className="header-right">
        <button className="header-btn" onClick={downloadAsZip} title="Download ZIP">
          <Download size={16} />
        </button>
        <button className="header-btn" title="Share">
          <Share size={16} />
        </button>
        <button className="header-btn" title="View on GitHub">
          <Github size={16} />
        </button>
      </div>
    </header>
  )
}

export default Header
