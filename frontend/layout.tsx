import type React from "react"
 
import "./globals.css"

 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, height: "100vh", overflow: "hidden" }}>{children}</body>
    </html>
  )
}
