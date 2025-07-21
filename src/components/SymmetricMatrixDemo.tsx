'use client'

import React, { useRef, useEffect, useState } from 'react'

interface Matrix2D {
  a: number
  b: number
  c: number
  d: number
}

interface Vector2D {
  x: number
  y: number
}

interface EigenData {
  eigenvalue1: number
  eigenvalue2: number
  eigenvector1: Vector2D
  eigenvector2: Vector2D
}

const SymmetricMatrixDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [matrix, setMatrix] = useState<Matrix2D>({ a: 2, b: 1, c: 1, d: 2 })
  const [showEigenvectors, setShowEigenvectors] = useState(true)
  const [showContours, setShowContours] = useState(true)
  const [animationId, setAnimationId] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragElement, setDragElement] = useState<string | null>(null)

  const calculateEigenvalues = (m: Matrix2D): EigenData => {
    const trace = m.a + m.d
    const det = m.a * m.d - m.b * m.c
    const discriminant = trace * trace - 4 * det
    
    const lambda1 = (trace + Math.sqrt(Math.max(0, discriminant))) / 2
    const lambda2 = (trace - Math.sqrt(Math.max(0, discriminant))) / 2
    
    // Calculate eigenvectors
    let v1: Vector2D, v2: Vector2D
    
    if (Math.abs(m.b) < 1e-10) {
      v1 = { x: 1, y: 0 }
      v2 = { x: 0, y: 1 }
    } else {
      v1 = { x: lambda1 - m.d, y: m.b }
      v2 = { x: lambda2 - m.d, y: m.b }
      
      // Normalize
      const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y)
      const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y)
      
      v1.x /= len1; v1.y /= len1
      v2.x /= len2; v2.y /= len2
    }
    
    return {
      eigenvalue1: lambda1,
      eigenvalue2: lambda2,
      eigenvector1: v1,
      eigenvector2: v2
    }
  }

  const quadraticForm = (x: number, y: number, m: Matrix2D): number => {
    return m.a * x * x + 2 * m.b * x * y + m.d * y * y
  }

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const scale = 80
    
    ctx.clearRect(0, 0, width, height)
    
    // Draw grid
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 1
    for (let i = -5; i <= 5; i++) {
      if (i === 0) continue
      ctx.beginPath()
      ctx.moveTo(centerX + i * scale, 0)
      ctx.lineTo(centerX + i * scale, height)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(0, centerY + i * scale)
      ctx.lineTo(width, centerY + i * scale)
      ctx.stroke()
    }
    
    // Draw axes
    ctx.strokeStyle = '#888'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()
    
    // Draw contours of quadratic form
    if (showContours) {
      const levels = [0.5, 1, 2, 4, 8]
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']
      
      levels.forEach((level, i) => {
        ctx.strokeStyle = colors[i]
        ctx.lineWidth = 2
        ctx.beginPath()
        
        let firstPoint = true
        for (let angle = 0; angle <= 2 * Math.PI; angle += 0.02) {
          // Find point on contour by binary search
          let r = 0.1
          let maxR = 5
          let minR = 0
          
          for (let iter = 0; iter < 20; iter++) {
            const x = r * Math.cos(angle)
            const y = r * Math.sin(angle)
            const value = quadraticForm(x, y, matrix)
            
            if (Math.abs(value - level) < 0.001) break
            
            if (value > level) {
              maxR = r
              r = (minR + r) / 2
            } else {
              minR = r
              r = (r + maxR) / 2
            }
          }
          
          const screenX = centerX + r * Math.cos(angle) * scale
          const screenY = centerY - r * Math.sin(angle) * scale
          
          if (firstPoint) {
            ctx.moveTo(screenX, screenY)
            firstPoint = false
          } else {
            ctx.lineTo(screenX, screenY)
          }
        }
        
        ctx.closePath()
        ctx.stroke()
      })
    }
    
    // Draw eigenvectors
    if (showEigenvectors) {
      const eigenData = calculateEigenvalues(matrix)
      
      // First eigenvector (red)
      ctx.strokeStyle = '#e74c3c'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX + eigenData.eigenvector1.x * Math.sqrt(Math.abs(eigenData.eigenvalue1)) * scale,
        centerY - eigenData.eigenvector1.y * Math.sqrt(Math.abs(eigenData.eigenvalue1)) * scale
      )
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX - eigenData.eigenvector1.x * Math.sqrt(Math.abs(eigenData.eigenvalue1)) * scale,
        centerY + eigenData.eigenvector1.y * Math.sqrt(Math.abs(eigenData.eigenvalue1)) * scale
      )
      ctx.stroke()
      
      // Second eigenvector (blue)
      ctx.strokeStyle = '#3498db'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX + eigenData.eigenvector2.x * Math.sqrt(Math.abs(eigenData.eigenvalue2)) * scale,
        centerY - eigenData.eigenvector2.y * Math.sqrt(Math.abs(eigenData.eigenvalue2)) * scale
      )
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX - eigenData.eigenvector2.x * Math.sqrt(Math.abs(eigenData.eigenvalue2)) * scale,
        centerY + eigenData.eigenvector2.y * Math.sqrt(Math.abs(eigenData.eigenvalue2)) * scale
      )
      ctx.stroke()
      
      // Draw eigenvalue labels
      ctx.fillStyle = '#e74c3c'
      ctx.font = '14px Arial'
      ctx.fillText(
        `λ₁ = ${eigenData.eigenvalue1.toFixed(2)}`,
        centerX + eigenData.eigenvector1.x * Math.sqrt(Math.abs(eigenData.eigenvalue1)) * scale + 10,
        centerY - eigenData.eigenvector1.y * Math.sqrt(Math.abs(eigenData.eigenvalue1)) * scale
      )
      
      ctx.fillStyle = '#3498db'
      ctx.fillText(
        `λ₂ = ${eigenData.eigenvalue2.toFixed(2)}`,
        centerX + eigenData.eigenvector2.x * Math.sqrt(Math.abs(eigenData.eigenvalue2)) * scale + 10,
        centerY - eigenData.eigenvector2.y * Math.sqrt(Math.abs(eigenData.eigenvalue2)) * scale
      )
    }
    
    // Draw matrix elements as interactive points
    ctx.fillStyle = '#2c3e50'
    ctx.font = '16px Arial'
    ctx.fillText('Matrix A:', 10, 30)
    ctx.fillText(`[${matrix.a.toFixed(1)}  ${matrix.b.toFixed(1)}]`, 10, 50)
    ctx.fillText(`[${matrix.c.toFixed(1)}  ${matrix.d.toFixed(1)}]`, 10, 70)
    
    // Determinant and trace
    const det = matrix.a * matrix.d - matrix.b * matrix.c
    const trace = matrix.a + matrix.d
    ctx.fillText(`det(A) = ${det.toFixed(2)}`, 10, 100)
    ctx.fillText(`tr(A) = ${trace.toFixed(2)}`, 10, 120)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Check if clicking on matrix elements (simplified)
    if (x < 150 && y < 80 && y > 30) {
      setIsDragging(true)
      setDragElement('matrix')
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragElement !== 'matrix') return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Update matrix based on mouse position
    const newA = 1 + (x - 75) / 50
    const newD = 1 + (y - 50) / 50
    const newB = (x - 100) / 100
    
    setMatrix({
      a: Math.max(0.1, Math.min(5, newA)),
      b: Math.max(-2, Math.min(2, newB)),
      c: Math.max(-2, Math.min(2, newB)), // Keep symmetric
      d: Math.max(0.1, Math.min(5, newD))
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragElement(null)
  }

  useEffect(() => {
    const animate = () => {
      draw()
      const id = requestAnimationFrame(animate)
      setAnimationId(id)
    }
    
    animate()
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [matrix, showEigenvectors, showContours])

  const presetMatrices = [
    { name: 'Identity', matrix: { a: 1, b: 0, c: 0, d: 1 } },
    { name: 'Stretch X', matrix: { a: 3, b: 0, c: 0, d: 1 } },
    { name: 'Stretch Y', matrix: { a: 1, b: 0, c: 0, d: 3 } },
    { name: 'Diagonal', matrix: { a: 2, b: 0, c: 0, d: 0.5 } },
    { name: 'Shear', matrix: { a: 2, b: 1, c: 1, d: 2 } },
    { name: 'Correlation', matrix: { a: 1, b: 0.8, c: 0.8, d: 1 } },
  ]

  return (
    <div className="interactive-demo">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Interactive Symmetric Matrix Explorer</h3>
        <p className="text-gray-600">
          Explore how symmetric matrices define quadratic forms and their geometric interpretation through eigendecomposition.
        </p>
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300 bg-white cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      
      <div className="mt-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showEigenvectors}
              onChange={(e) => setShowEigenvectors(e.target.checked)}
            />
            <span>Show Eigenvectors</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showContours}
              onChange={(e) => setShowContours(e.target.checked)}
            />
            <span>Show Contour Lines</span>
          </label>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Preset Matrices:</h4>
          <div className="flex flex-wrap gap-2">
            {presetMatrices.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setMatrix(preset.matrix)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Matrix Controls:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">a₁₁</label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={matrix.a}
                onChange={(e) => setMatrix(prev => ({ ...prev, a: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{matrix.a.toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">a₁₂ = a₂₁</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={matrix.b}
                onChange={(e) => setMatrix(prev => ({ ...prev, b: parseFloat(e.target.value), c: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{matrix.b.toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">a₂₂</label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={matrix.d}
                onChange={(e) => setMatrix(prev => ({ ...prev, d: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{matrix.d.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymmetricMatrixDemo