import { Download, Github, Share } from "lucide-react"
import "./Header.css"
type HeaderProps = {
  files : Record<string , string>
}
const Header = ({files}:HeaderProps) => {
  //  at first get data and then call backend request i dont know but  i have to do this shit 
  const downloadAsZip = async () => {
  try{
  const body = {
      html: files["index.html"] || "",
      css: files["style.css"] || "",
      js: files["script.js"] || "", 
    };
const response = await fetch("http://localhost:5000/api/animations/download-zip", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body)
});

if(!response.ok)throw new Error("failed to download zip ") ; 
const blob = await response.blob() ; 
const url = URL.createObjectURL(blob) ; 
const a = document.createElement("a") ; 
a.href = url  ; 
a.download = "animation.zip" ; 
a.click() ; 
 URL.revokeObjectURL(url)
  }
  catch(error){
    console.log("download Error" , error) ; 
  }
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
