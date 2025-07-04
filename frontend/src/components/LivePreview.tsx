import type React from "react"
import { useMemo } from "react"
import "./LivePreview.css"
interface LivePreviewProps {
  htmlContent: string
  cssContent: string
  jsContent: string
  isFullscreen?: boolean
  onExitFullscreen?: () => void
}

const LivePreview: React.FC<LivePreviewProps> = ({
  htmlContent,
  cssContent,
  jsContent,
  isFullscreen = false,
  onExitFullscreen,
}) => {
  /* Build the complete HTML once per change */
  const srcDoc = useMemo(
    () => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Animation Preview</title>
    <style>
      html,body{margin:0;padding:0}
      ${cssContent}
    </style>
  </head>
  <body>
    ${htmlContent}
    <script>
      try {
        ${jsContent}
      } catch (err) {
        console.error('Error in preview:', err);
      }
    </script>
  </body>
</html>`,
    [htmlContent, cssContent, jsContent],
  )

  if (isFullscreen) {
    return (
      <div className="fullscreen-preview-container">
        <div className="fullscreen-header">
          <span>Animation Preview - Fullscreen</span>
          <button className="exit-fullscreen-btn" onClick={onExitFullscreen} title="Exit Fullscreen">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
            <span>Exit Fullscreen</span>
          </button>
        </div>
        <div className="fullscreen-preview-content">
          <iframe
            className="preview-iframe fullscreen-iframe"
            title="Animation Preview"
            sandbox="allow-scripts allow-same-origin"
            srcDoc={srcDoc}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="live-preview">
      <iframe
        className="preview-iframe"
        title="Animation Preview"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={srcDoc}
      />
    </div>
  )
}

export default LivePreview
