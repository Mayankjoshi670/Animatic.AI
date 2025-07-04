import type React from "react"
import { useMemo } from "react"
import "./LivePreview.css"

interface LivePreviewProps {
  htmlContent: string
  cssContent: string
  jsContent: string
}

const LivePreview: React.FC<LivePreviewProps> = ({ htmlContent, cssContent, jsContent }) => {
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
