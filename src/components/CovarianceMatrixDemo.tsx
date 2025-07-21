'use client'

import React, { useRef, useEffect, useState } from 'react'

interface Vector2D {
  x: number
  y: number
}

interface CovarianceMatrix {
  σ11: number  // variance of X
  σ12: number  // covariance of X,Y
  σ21: number  // covariance of Y,X (same as σ12)
  σ22: number  // variance of Y
}

const CovarianceMatrixDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [covMatrix, setCovMatrix] = useState<CovarianceMatrix>({ σ11: 1, σ12: 0.5, σ21: 0.5, σ22: 1 })
  const [mean, setMean] = useState<Vector2D>({ x: 0, y: 0 })
  const [showSamples, setShowSamples] = useState(true)
  const [showEllipse, setShowEllipse] = useState(true)
  const [showDensity, setShowDensity] = useState(true)
  const [samples, setSamples] = useState<Vector2D[]>([])
  const [animationId, setAnimationId] = useState<number | null>(null)

  // Generate random samples from multivariate Gaussian
  const generateSamples = (n: number = 200): Vector2D[] => {
    const samples: Vector2D[] = []
    
    for (let i = 0; i < n; i++) {
      // Box-Muller transform for standard normal
      const u1 = Math.random()
      const u2 = Math.random()
      const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
      const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2)
      
      // Transform to desired covariance structure using Cholesky decomposition
      const a = Math.sqrt(covMatrix.σ11)
      const b = covMatrix.σ12 / a
      const c = Math.sqrt(covMatrix.σ22 - b * b)
      
      const x = mean.x + a * z1
      const y = mean.y + b * z1 + c * z2
      
      samples.push({ x, y })
    }
    
    return samples
  }

  // Multivariate Gaussian PDF
  const gaussianPDF = (x: number, y: number): number => {
    const det = covMatrix.σ11 * covMatrix.σ22 - covMatrix.σ12 * covMatrix.σ21
    if (det <= 0) return 0
    
    const dx = x - mean.x
    const dy = y - mean.y
    
    const inv11 = covMatrix.σ22 / det
    const inv12 = -covMatrix.σ12 / det
    const inv22 = covMatrix.σ11 / det
    
    const exponent = -0.5 * (dx * (inv11 * dx + inv12 * dy) + dy * (inv12 * dx + inv22 * dy))
    
    return (1 / (2 * Math.PI * Math.sqrt(det))) * Math.exp(exponent)
  }

  // Calculate confidence ellipse parameters
  const getEllipseParams = (confidenceLevel: number = 0.95) => {
    const det = covMatrix.σ11 * covMatrix.σ22 - covMatrix.σ12 * covMatrix.σ21
    if (det <= 0) return null
    
    // Eigenvalues of covariance matrix
    const trace = covMatrix.σ11 + covMatrix.σ22
    const discriminant = Math.sqrt((covMatrix.σ11 - covMatrix.σ22) ** 2 + 4 * covMatrix.σ12 ** 2)
    
    const λ1 = (trace + discriminant) / 2
    const λ2 = (trace - discriminant) / 2
    
    // Eigenvector for largest eigenvalue
    const v1x = covMatrix.σ12
    const v1y = λ1 - covMatrix.σ11
    const v1Len = Math.sqrt(v1x * v1x + v1y * v1y)
    
    const angle = v1Len > 1e-10 ? Math.atan2(v1y, v1x) : 0
    
    // Chi-squared value for confidence level
    const chiSquared = confidenceLevel === 0.95 ? 5.991 : 
                      confidenceLevel === 0.68 ? 2.279 : 
                      confidenceLevel === 0.99 ? 9.210 : 5.991
    
    const a = Math.sqrt(chiSquared * λ1)
    const b = Math.sqrt(chiSquared * λ2)
    
    return { a, b, angle }
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
    const scale = 100
    
    ctx.clearRect(0, 0, width, height)
    
    // Draw grid
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 1
    for (let i = -4; i <= 4; i++) {
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
    
    // Draw density contours
    if (showDensity) {
      const levels = [0.05, 0.1, 0.15, 0.2]
      const colors = ['#e8f4fd', '#b3d9f7', '#7cc7f0', '#45b5e8']
      
      levels.forEach((level, i) => {
        ctx.strokeStyle = colors[i]
        ctx.lineWidth = 2
        ctx.beginPath()
        
        let firstPoint = true
        for (let angle = 0; angle <= 2 * Math.PI; angle += 0.05) {
          // Find contour point using binary search
          let r = 0.1
          let maxR = 4
          let minR = 0
          
          for (let iter = 0; iter < 15; iter++) {
            const x = mean.x + r * Math.cos(angle)
            const y = mean.y + r * Math.sin(angle)
            const density = gaussianPDF(x, y)
            
            if (Math.abs(density - level) < 0.001) break
            
            if (density > level) {
              minR = r
              r = (r + maxR) / 2
            } else {
              maxR = r
              r = (minR + r) / 2
            }
          }
          
          const screenX = centerX + (mean.x + r * Math.cos(angle)) * scale
          const screenY = centerY - (mean.y + r * Math.sin(angle)) * scale
          
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
    
    // Draw confidence ellipses
    if (showEllipse) {
      const confidenceLevels = [0.68, 0.95, 0.99]
      const ellipseColors = ['#ff6b6b', '#4ecdc4', '#45b7d1']
      
      confidenceLevels.forEach((level, i) => {
        const ellipseParams = getEllipseParams(level)
        if (!ellipseParams) return
        
        ctx.strokeStyle = ellipseColors[i]
        ctx.lineWidth = 2
        ctx.beginPath()
        
        const centerScreenX = centerX + mean.x * scale
        const centerScreenY = centerY - mean.y * scale
        
        ctx.ellipse(
          centerScreenX,
          centerScreenY,
          ellipseParams.a * scale,
          ellipseParams.b * scale,
          -ellipseParams.angle,
          0,
          2 * Math.PI
        )
        ctx.stroke()
        
        // Label confidence levels
        ctx.fillStyle = ellipseColors[i]
        ctx.font = '12px Arial'
        ctx.fillText(
          `${(level * 100).toFixed(0)}%`,
          centerScreenX + ellipseParams.a * scale * 0.7 * Math.cos(ellipseParams.angle),
          centerScreenY + ellipseParams.a * scale * 0.7 * Math.sin(ellipseParams.angle)
        )
      })
    }
    
    // Draw sample points
    if (showSamples && samples.length > 0) {
      ctx.fillStyle = '#34495e'
      samples.forEach(sample => {
        const screenX = centerX + sample.x * scale
        const screenY = centerY - sample.y * scale
        
        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          ctx.beginPath()
          ctx.arc(screenX, screenY, 2, 0, 2 * Math.PI)
          ctx.fill()
        }
      })
    }
    
    // Draw mean point
    ctx.fillStyle = '#e74c3c'
    ctx.beginPath()
    ctx.arc(centerX + mean.x * scale, centerY - mean.y * scale, 6, 0, 2 * Math.PI)
    ctx.fill()
    
    // Draw covariance matrix info
    ctx.fillStyle = '#2c3e50'
    ctx.font = '16px Arial'
    ctx.fillText('Covariance Matrix Σ:', 10, 30)
    ctx.fillText(`[${covMatrix.σ11.toFixed(2)}  ${covMatrix.σ12.toFixed(2)}]`, 10, 50)
    ctx.fillText(`[${covMatrix.σ21.toFixed(2)}  ${covMatrix.σ22.toFixed(2)}]`, 10, 70)
    
    // Additional statistics
    const det = covMatrix.σ11 * covMatrix.σ22 - covMatrix.σ12 * covMatrix.σ21
    const correlation = covMatrix.σ12 / Math.sqrt(covMatrix.σ11 * covMatrix.σ22)
    
    ctx.fillText(`det(Σ) = ${det.toFixed(3)}`, 10, 100)
    ctx.fillText(`ρ = ${correlation.toFixed(3)}`, 10, 120)
    ctx.fillText(`μ = [${mean.x.toFixed(1)}, ${mean.y.toFixed(1)}]`, 10, 140)
  }

  useEffect(() => {
    setSamples(generateSamples())
  }, [covMatrix, mean])

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
  }, [covMatrix, mean, samples, showSamples, showEllipse, showDensity])

  const presetDistributions = [
    { name: 'Uncorrelated', cov: { σ11: 1, σ12: 0, σ21: 0, σ22: 1 }, mean: { x: 0, y: 0 } },
    { name: 'Positive Correlation', cov: { σ11: 1, σ12: 0.8, σ21: 0.8, σ22: 1 }, mean: { x: 0, y: 0 } },
    { name: 'Negative Correlation', cov: { σ11: 1, σ12: -0.8, σ21: -0.8, σ22: 1 }, mean: { x: 0, y: 0 } },
    { name: 'Different Variances', cov: { σ11: 2, σ12: 0, σ21: 0, σ22: 0.5 }, mean: { x: 0, y: 0 } },
    { name: 'High Correlation', cov: { σ11: 1, σ12: 0.95, σ21: 0.95, σ22: 1 }, mean: { x: 0, y: 0 } },
  ]

  return (
    <div className="interactive-demo">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Multivariate Gaussian & Covariance Matrix</h3>
        <p className="text-gray-600">
          Visualize how the covariance matrix shapes the multivariate Gaussian distribution and confidence regions.
        </p>
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300 bg-white"
      />
      
      <div className="mt-4 space-y-4">
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showSamples}
              onChange={(e) => setShowSamples(e.target.checked)}
            />
            <span>Show Samples</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showEllipse}
              onChange={(e) => setShowEllipse(e.target.checked)}
            />
            <span>Show Confidence Ellipses</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showDensity}
              onChange={(e) => setShowDensity(e.target.checked)}
            />
            <span>Show Density Contours</span>
          </label>
          <button
            onClick={() => setSamples(generateSamples())}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Generate New Samples
          </button>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Preset Distributions:</h4>
          <div className="flex flex-wrap gap-2">
            {presetDistributions.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setCovMatrix(preset.cov)
                  setMean(preset.mean)
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Covariance Matrix Controls:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">σ₁₁ (X variance)</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={covMatrix.σ11}
                onChange={(e) => setCovMatrix(prev => ({ ...prev, σ11: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{covMatrix.σ11.toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">σ₁₂ = σ₂₁ (covariance)</label>
              <input
                type="range"
                min={-Math.sqrt(covMatrix.σ11 * covMatrix.σ22) * 0.99}
                max={Math.sqrt(covMatrix.σ11 * covMatrix.σ22) * 0.99}
                step="0.05"
                value={covMatrix.σ12}
                onChange={(e) => setCovMatrix(prev => ({ 
                  ...prev, 
                  σ12: parseFloat(e.target.value),
                  σ21: parseFloat(e.target.value)
                }))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{covMatrix.σ12.toFixed(2)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">σ₂₂ (Y variance)</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={covMatrix.σ22}
                onChange={(e) => setCovMatrix(prev => ({ ...prev, σ22: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{covMatrix.σ22.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Mean Controls:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">μ₁ (X mean)</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={mean.x}
                onChange={(e) => setMean(prev => ({ ...prev, x: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{mean.x.toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">μ₂ (Y mean)</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={mean.y}
                onChange={(e) => setMean(prev => ({ ...prev, y: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{mean.y.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CovarianceMatrixDemo