"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface OptimizationState {
  position: Point;
  gradient: Point;
  step: number;
  converged: boolean;
  path: Point[];
}

export default function GradientDescentDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [method, setMethod] = useState<'gradient' | 'newton'>('gradient');
  const [learningRate, setLearningRate] = useState(0.1);
  const [functionType, setFunctionType] = useState<'quadratic' | 'rosenbrock' | 'himmelblau'>('quadratic');
  const [gdState, setGdState] = useState<OptimizationState>({
    position: { x: -2, y: 1.5 },
    gradient: { x: 0, y: 0 },
    step: 0,
    converged: false,
    path: []
  });
  const [newtonState, setNewtonState] = useState<OptimizationState>({
    position: { x: -2, y: 1.5 },
    gradient: { x: 0, y: 0 },
    step: 0,
    converged: false,
    path: []
  });

  const animationRef = useRef<number>();
  const CANVAS_SIZE = 400;
  const SCALE = 40;
  const OFFSET = CANVAS_SIZE / 2;

  // Define objective functions
  const functions = {
    quadratic: {
      f: (x: number, y: number) => 0.5 * x * x + 0.8 * y * y + 0.3 * x * y,
      gradient: (x: number, y: number) => ({ x: x + 0.3 * y, y: 1.6 * y + 0.3 * x }),
      hessian: (x: number, y: number) => [[1, 0.3], [0.3, 1.6]],
      name: "Quadratic: f(x,y) = 0.5x² + 0.8y² + 0.3xy"
    },
    rosenbrock: {
      f: (x: number, y: number) => (1 - x) * (1 - x) + 100 * (y - x * x) * (y - x * x),
      gradient: (x: number, y: number) => ({
        x: -2 * (1 - x) - 400 * x * (y - x * x),
        y: 200 * (y - x * x)
      }),
      hessian: (x: number, y: number) => [
        [2 + 1200 * x * x - 400 * y, -400 * x],
        [-400 * x, 200]
      ],
      name: "Rosenbrock: f(x,y) = (1-x)² + 100(y-x²)²"
    },
    himmelblau: {
      f: (x: number, y: number) => (x * x + y - 11) * (x * x + y - 11) + (x + y * y - 7) * (x + y * y - 7),
      gradient: (x: number, y: number) => ({
        x: 2 * (x * x + y - 11) * 2 * x + 2 * (x + y * y - 7),
        y: 2 * (x * x + y - 11) + 2 * (x + y * y - 7) * 2 * y
      }),
      hessian: (x: number, y: number) => [
        [12 * x * x + 4 * y - 42, 4 * x + 4 * y],
        [4 * x + 4 * y, 4 * x + 12 * y * y - 26]
      ],
      name: "Himmelblau: f(x,y) = (x²+y-11)² + (x+y²-7)²"
    }
  };

  const currentFunction = functions[functionType];

  // Matrix operations for Newton's method
  const matrixInverse2x2 = (matrix: number[][]): number[][] => {
    const [[a, b], [c, d]] = matrix;
    const det = a * d - b * c;
    if (Math.abs(det) < 1e-10) {
      // Add regularization for numerical stability
      const reg = 0.01;
      return [[1/reg, 0], [0, 1/reg]];
    }
    return [[d / det, -b / det], [-c / det, a / det]];
  };

  const matrixVectorMultiply = (matrix: number[][], vector: Point): Point => {
    return {
      x: matrix[0][0] * vector.x + matrix[0][1] * vector.y,
      y: matrix[1][0] * vector.x + matrix[1][1] * vector.y
    };
  };

  const drawContourPlot = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);
    const data = imageData.data;

    // Find function range for color mapping
    let minF = Infinity, maxF = -Infinity;
    const values: number[][] = [];
    
    for (let i = 0; i < CANVAS_SIZE; i++) {
      values[i] = [];
      for (let j = 0; j < CANVAS_SIZE; j++) {
        const x = (i - OFFSET) / SCALE;
        const y = (OFFSET - j) / SCALE;
        const fVal = currentFunction.f(x, y);
        values[i][j] = fVal;
        minF = Math.min(minF, fVal);
        maxF = Math.max(maxF, fVal);
      }
    }

    // Draw contours
    for (let i = 0; i < CANVAS_SIZE; i++) {
      for (let j = 0; j < CANVAS_SIZE; j++) {
        const normalized = Math.log(1 + values[i][j] - minF) / Math.log(1 + maxF - minF);
        const intensity = Math.floor(255 * (1 - normalized * 0.8));
        
        const idx = (j * CANVAS_SIZE + i) * 4;
        data[idx] = intensity;     // Red
        data[idx + 1] = intensity; // Green  
        data[idx + 2] = 255;       // Blue
        data[idx + 3] = 255;       // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Draw contour lines
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
    ctx.lineWidth = 1;
    
    const contourLevels = 10;
    for (let level = 1; level <= contourLevels; level++) {
      const targetValue = minF + (maxF - minF) * (level / contourLevels);
      ctx.beginPath();
      
      // Simple contour approximation
      for (let i = 0; i < CANVAS_SIZE - 1; i++) {
        for (let j = 0; j < CANVAS_SIZE - 1; j++) {
          const val = values[i][j];
          if (Math.abs(val - targetValue) < (maxF - minF) * 0.05) {
            ctx.fillRect(i, j, 1, 1);
          }
        }
      }
    }
  };

  const drawOptimizationPath = (ctx: CanvasRenderingContext2D, state: OptimizationState, color: string) => {
    if (state.path.length < 2) return;

    // Draw path
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < state.path.length; i++) {
      const point = state.path[i];
      const canvasX = point.x * SCALE + OFFSET;
      const canvasY = OFFSET - point.y * SCALE;
      
      if (i === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();

    // Draw points
    state.path.forEach((point, index) => {
      const canvasX = point.x * SCALE + OFFSET;
      const canvasY = OFFSET - point.y * SCALE;
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, index === state.path.length - 1 ? 6 : 3, 0, 2 * Math.PI);
      ctx.fill();
      
      if (index === state.path.length - 1) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    // Draw gradient vector
    if (state.path.length > 0) {
      const currentPos = state.path[state.path.length - 1];
      const grad = currentFunction.gradient(currentPos.x, currentPos.y);
      const gradLength = Math.sqrt(grad.x * grad.x + grad.y * grad.y);
      
      if (gradLength > 0.01) {
        const canvasX = currentPos.x * SCALE + OFFSET;
        const canvasY = OFFSET - currentPos.y * SCALE;
        const gradEndX = canvasX - (grad.x / gradLength) * 30;
        const gradEndY = canvasY + (grad.y / gradLength) * 30;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        ctx.lineTo(gradEndX, gradEndY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Arrow head
        const angle = Math.atan2(grad.y, -grad.x);
        ctx.beginPath();
        ctx.moveTo(gradEndX, gradEndY);
        ctx.lineTo(
          gradEndX + 8 * Math.cos(angle - 0.5),
          gradEndY + 8 * Math.sin(angle - 0.5)
        );
        ctx.moveTo(gradEndX, gradEndY);
        ctx.lineTo(
          gradEndX + 8 * Math.cos(angle + 0.5),
          gradEndY + 8 * Math.sin(angle + 0.5)
        );
        ctx.stroke();
      }
    }
  };

  const performOptimizationStep = (currentState: OptimizationState, isNewton: boolean): OptimizationState => {
    const { x, y } = currentState.position;
    const grad = currentFunction.gradient(x, y);
    const gradientMagnitude = Math.sqrt(grad.x * grad.x + grad.y * grad.y);
    
    if (gradientMagnitude < 1e-6) {
      return { ...currentState, converged: true };
    }

    let newPosition: Point;
    
    if (isNewton) {
      // Newton's method
      const hessian = currentFunction.hessian(x, y);
      const invHessian = matrixInverse2x2(hessian);
      const newtonStep = matrixVectorMultiply(invHessian, grad);
      
      newPosition = {
        x: x - newtonStep.x,
        y: y - newtonStep.y
      };
    } else {
      // Gradient descent
      newPosition = {
        x: x - learningRate * grad.x,
        y: y - learningRate * grad.y
      };
    }

    const newPath = [...currentState.path, newPosition];
    
    return {
      position: newPosition,
      gradient: grad,
      step: currentState.step + 1,
      converged: false,
      path: newPath
    };
  };

  const animate = () => {
    if (!isAnimating) return;

    setGdState(prev => {
      if (prev.converged || prev.step >= 100) return prev;
      return performOptimizationStep(prev, false);
    });

    setNewtonState(prev => {
      if (prev.converged || prev.step >= 100) return prev;
      return performOptimizationStep(prev, true);
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
  };

  const pauseAnimation = () => {
    setIsAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const resetAnimation = () => {
    pauseAnimation();
    const initialPosition = { x: -2, y: 1.5 };
    setGdState({
      position: initialPosition,
      gradient: { x: 0, y: 0 },
      step: 0,
      converged: false,
      path: [initialPosition]
    });
    setNewtonState({
      position: initialPosition,
      gradient: { x: 0, y: 0 },
      step: 0,
      converged: false,
      path: [initialPosition]
    });
  };

  useEffect(() => {
    if (isAnimating && !gdState.converged && !newtonState.converged) {
      const timeoutId = setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, 200);
      return () => clearTimeout(timeoutId);
    } else if (isAnimating && (gdState.converged || newtonState.converged)) {
      setIsAnimating(false);
    }
  }, [isAnimating, gdState.converged, newtonState.converged]);

  useEffect(() => {
    resetAnimation();
  }, [functionType]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw contour plot
    drawContourPlot(ctx);
    
    // Draw coordinate axes
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, OFFSET);
    ctx.lineTo(CANVAS_SIZE, OFFSET);
    ctx.moveTo(OFFSET, 0);
    ctx.lineTo(OFFSET, CANVAS_SIZE);
    ctx.stroke();

    // Draw optimization paths
    drawOptimizationPath(ctx, gdState, '#ff4444');
    drawOptimizationPath(ctx, newtonState, '#44ff44');

  }, [gdState, newtonState, functionType]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl lucida-bold mb-6">Interactive Optimization Comparison</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization */}
        <div className="space-y-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              className="border border-gray-300 rounded"
            />
            <div className="absolute top-2 left-2 bg-white bg-opacity-90 p-2 rounded text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Gradient Descent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Newton's Method</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={startAnimation}
                disabled={isAnimating}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 lucida text-sm"
              >
                Start
              </button>
              <button
                onClick={pauseAnimation}
                disabled={!isAnimating}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 lucida text-sm"
              >
                Pause
              </button>
              <button
                onClick={resetAnimation}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 lucida text-sm"
              >
                Reset
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm lucida">
                Function:
                <select
                  value={functionType}
                  onChange={(e) => setFunctionType(e.target.value as any)}
                  className="ml-2 px-2 py-1 border rounded lucida text-sm"
                >
                  <option value="quadratic">Quadratic</option>
                  <option value="rosenbrock">Rosenbrock</option>
                  <option value="himmelblau">Himmelblau</option>
                </select>
              </label>

              <label className="block text-sm lucida">
                Learning Rate: {learningRate.toFixed(3)}
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="ml-2 w-32"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="lucida-bold mb-2">Current Function</h4>
            <p className="text-sm lucida">{currentFunction.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-3 rounded">
              <h5 className="lucida-bold text-red-700 mb-1">Gradient Descent</h5>
              <div className="text-xs lucida space-y-1">
                <div>Step: {gdState.step}</div>
                <div>Position: ({gdState.position.x.toFixed(3)}, {gdState.position.y.toFixed(3)})</div>
                <div>Gradient: ({gdState.gradient.x.toFixed(3)}, {gdState.gradient.y.toFixed(3)})</div>
                <div>Status: {gdState.converged ? 'Converged' : 'Running'}</div>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded">
              <h5 className="lucida-bold text-green-700 mb-1">Newton's Method</h5>
              <div className="text-xs lucida space-y-1">
                <div>Step: {newtonState.step}</div>
                <div>Position: ({newtonState.position.x.toFixed(3)}, {newtonState.position.y.toFixed(3)})</div>
                <div>Gradient: ({newtonState.gradient.x.toFixed(3)}, {newtonState.gradient.y.toFixed(3)})</div>
                <div>Status: {newtonState.converged ? 'Converged' : 'Running'}</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded">
            <h4 className="lucida-bold mb-2">Algorithm Comparison</h4>
            <div className="text-sm lucida space-y-2">
              <div>
                <strong>Gradient Descent:</strong> First-order method using only gradient information. 
                Update: x_{'{k+1}'} = x_k - α∇f(x_k)
              </div>
              <div>
                <strong>Newton's Method:</strong> Second-order method using gradient and Hessian. 
                Update: x_{'{k+1}'} = x_k - H⁻¹∇f(x_k)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}