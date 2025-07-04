"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import "./ResizablePane.css"

interface ResizablePaneProps {
  left: React.ReactNode
  center: React.ReactNode
  right: React.ReactNode
  defaultSizes?: [number, number, number] // percentages that sum to 100
}

const ResizablePane = ({ left, center, right, defaultSizes = [30, 40, 30] }: ResizablePaneProps) => {
  const [sizes, setSizes] = useState(defaultSizes)
  const [isDragging, setIsDragging] = useState<"left" | "right" | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((divider: "left" | "right") => {
    setIsDragging(divider)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const mouseX = e.clientX - containerRect.left
      const percentage = (mouseX / containerWidth) * 100

      if (isDragging === "left") {
        // Dragging left divider
        const minLeft = 15
        const maxLeft = 50
        const newLeftSize = Math.max(minLeft, Math.min(maxLeft, percentage))
        const remainingSpace = 100 - newLeftSize
        const centerRatio = sizes[1] / (sizes[1] + sizes[2])
        const newCenterSize = remainingSpace * centerRatio
        const newRightSize = remainingSpace * (1 - centerRatio)

        setSizes([newLeftSize, newCenterSize, newRightSize])
      } else if (isDragging === "right") {
        // Dragging right divider
        const minRight = 15
        const maxRight = 50
        const newRightSize = Math.max(minRight, Math.min(maxRight, 100 - percentage))
        const remainingSpace = 100 - newRightSize
        const leftRatio = sizes[0] / (sizes[0] + sizes[1])
        const newLeftSize = remainingSpace * leftRatio
        const newCenterSize = remainingSpace * (1 - leftRatio)

        setSizes([newLeftSize, newCenterSize, newRightSize])
      }
    },
    [isDragging, sizes],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(null)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div ref={containerRef} className="resizable-pane-container">
      <div className="pane left-pane" style={{ width: `${sizes[0]}%` }}>
        {left}
      </div>

      <div
        className="divider left-divider"
        onMouseDown={() => handleMouseDown("left")}
        style={{ left: `${sizes[0]}%` }}
      >
        <div className="divider-handle" />
      </div>

      <div
        className="pane center-pane"
        style={{
          left: `${sizes[0]}%`,
          width: `${sizes[1]}%`,
        }}
      >
        {center}
      </div>

      <div
        className="divider right-divider"
        onMouseDown={() => handleMouseDown("right")}
        style={{ left: `${sizes[0] + sizes[1]}%` }}
      >
        <div className="divider-handle" />
      </div>

      <div
        className="pane right-pane"
        style={{
          left: `${sizes[0] + sizes[1]}%`,
          width: `${sizes[2]}%`,
        }}
      >
        {right}
      </div>
    </div>
  )
}

export default ResizablePane
