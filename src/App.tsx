import React, { useEffect, useRef } from 'react'
import { startScene } from './scene/scene'

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.log('will start scene with canvas', canvas.current)
    if (canvas.current) {
      startScene(canvas.current)
    }
  }, [])

  window.addEventListener('resize', () => {
    if (canvas.current) {
      canvas.current.width = window.innerWidth
      canvas.current.height = window.innerHeight
    }
  })

  return (
    <div className="App">
      <canvas ref={canvas} width={window.innerWidth} height={window.innerHeight} />
    </div>
  )
}

export default App
