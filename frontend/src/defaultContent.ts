export const defaultFiles = {
  "index.html": `<div class="container">
  <div class="animated-character">
    <div class="character-body">
      <div class="character-head"></div>
      <div class="character-eyes">
        <div class="eye left-eye"></div>
        <div class="eye right-eye"></div>
      </div>
      <div class="character-mouth"></div>
    </div>
  </div>
  <h1 class="title">Welcome to v0 Animation Studio!</h1>
  <p class="description">Ask me to create any animation you can imagine.</p>
</div>`,

  "style.css": `/* Container styles */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 20px;
}

/* Character animation */
.animated-character {
  margin-bottom: 2rem;
}

.character-body {
  position: relative;
  width: 120px;
  height: 120px;
  animation: bounce 2s infinite ease-in-out;
}

.character-head {
  width: 80px;
  height: 80px;
  background: #ffeb3b;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border: 3px solid #333;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.character-eyes {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 20px;
}

.eye {
  width: 12px;
  height: 12px;
  background: #333;
  border-radius: 50%;
  position: absolute;
  animation: blink 3s infinite;
}

.left-eye {
  left: 10px;
}

.right-eye {
  right: 10px;
}

.character-mouth {
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 10px;
  border: 2px solid #333;
  border-top: none;
  border-radius: 0 0 20px 20px;
}

/* Animations */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-20px) translateX(-50%);
  }
  60% {
    transform: translateY(-10px) translateX(-50%);
  }
}

@keyframes blink {
  0%, 90%, 100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.1);
  }
}

/* Text styles */
.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease-out;
  font-weight: 700;
}

.description {
  font-size: 1.2rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.3s both;
  max-width: 600px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .description {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .character-body {
    width: 100px;
    height: 100px;
  }
  
  .character-head {
    width: 60px;
    height: 60px;
  }
}`,

  "script.js": `// v0 Animation Studio - Interactive Script
console.log('v0 Animation Studio loaded! 🎨');

// Add click interaction to the character
document.addEventListener('DOMContentLoaded', function() {
  const character = document.querySelector('.animated-character');
  const title = document.querySelector('.title');
  
  if (character) {
    character.addEventListener('click', function() {
      // Add a spin animation on click
      this.style.animation = 'bounce 2s infinite ease-in-out, spin 1s ease-in-out';
      
      // Reset animation after 1 second
      setTimeout(() => {
        this.style.animation = 'bounce 2s infinite ease-in-out';
      }, 1000);
    });
    
    // Add hover effect
    character.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    character.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }
  
  // Interactive title
  if (title) {
    title.addEventListener('click', function() {
      const messages = [
        'Welcome to v0 Animation Studio!',
        'Create Amazing Animations! ✨',
        'Let Your Creativity Flow! 🎨',
        'Build Something Awesome! 🚀',
        'Animation Magic Awaits! 🎭'
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      this.textContent = randomMessage;
      
      // Add a pulse effect
      this.style.animation = 'pulse 0.5s ease-in-out';
      setTimeout(() => {
        this.style.animation = 'fadeInUp 1s ease-out';
      }, 500);
    });
  }
});

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = \`
  @keyframes spin {
    from { transform: rotate(0deg) translateX(-50%); }
    to { transform: rotate(360deg) translateX(-50%); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%);
    pointer-events: none;
    z-index: -1;
  }
\`;
document.head.appendChild(style);

// Add floating particles for extra magic
function createParticle() {
  const particle = document.createElement('div');
  particle.style.cssText = \`
    position: fixed;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    animation: float 4s linear forwards;
  \`;
  
  particle.style.left = Math.random() * window.innerWidth + 'px';
  particle.style.top = window.innerHeight + 'px';
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 4000);
}

// Particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = \`
  @keyframes float {
    to {
      transform: translateY(-\${window.innerHeight + 100}px) rotate(360deg);
      opacity: 0;
    }
  }
\`;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createParticle, 3000);`,
}
