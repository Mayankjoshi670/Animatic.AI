 

import type React from "react"
import "./AnimationLoader.css"

interface AnimationLoaderProps {
  message?: string
}

const AnimationLoader: React.FC<AnimationLoaderProps> = ({ message = "Generating your animation..." }) => {
  return (
    <div className="animation-loader">
      <div className="loader-container">
        {/* Main spinning elements */}
        <div className="loader-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>

        {/* Central pulsing core */}
        <div className="loader-core">
          <div className="core-inner">
            <div className="core-dot"></div>
          </div>
        </div>

        {/* Orbiting particles */}
        <div className="particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>

        {/* Floating elements */}
        <div className="floating-elements">
          <div className="float-element element-1">✨</div>
          <div className="float-element element-2">🎨</div>
          <div className="float-element element-3">⚡</div>
          <div className="float-element element-4">🌟</div>
        </div>
      </div>

      {/* Loading text with typewriter effect */}
      <div className="loader-text">
        <span className="text-content">{message}</span>
        <span className="cursor">|</span>
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  )
}

export default AnimationLoader
