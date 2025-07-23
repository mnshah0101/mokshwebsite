"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

export default function ConvexityDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFunction, setSelectedFunction] = useState<'convex' | 'nonconvex' | 'concave'>('convex');
  const [showTangent, setShowTangent] = useState(true);
  const [showSecant, setShowSecant] = useState(true);
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 300;
  const SCALE_X = 80;
  const SCALE_Y = 60;
  const OFFSET_X = CANVAS_WIDTH / 2;
  const OFFSET_Y = CANVAS_HEIGHT - 50;

  // Define different function types
  const functions = {
    convex: {
      f: (x: number) => 0.5 * x * x + 0.2 * x + 1,
      df: (x: number) => x + 0.2,
      d2f: (x: number) => 1,
      name: "Convex: f(x) = 0.5x² + 0.2x + 1",
      color: "#2563eb"
    },
    nonconvex: {
      f: (x: number) => 0.1 * x * x * x * x - 0.8 * x * x + 1.5,
      df: (x: number) => 0.4 * x * x * x - 1.6 * x,
      d2f: (x: number) => 1.2 * x * x - 1.6,
      name: "Non-convex: f(x) = 0.1x⁴ - 0.8x² + 1.5",
      color: "#dc2626"
    },
    concave: {
      f: (x: number) => -0.5 * x * x + 0.2 * x + 2,
      df: (x: number) => -x + 0.2,
      d2f: (x: number) => -1,
      name: "Concave: f(x) = -0.5x² + 0.2x + 2",
      color: "#7c3aed"
    }
  };

  const currentFunc = functions[selectedFunction];

  const screenToGraph = (screenX: number, screenY: number): Point => {
    return {
      x: (screenX - OFFSET_X) / SCALE_X,
      y: (OFFSET_Y - screenY) / SCALE_Y
    };
  };

  const graphToScreen = (graphX: number, graphY: number): Point => {
    return {
      x: graphX * SCALE_X + OFFSET_X,
      y: OFFSET_Y - graphY * SCALE_Y
    };
  };

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(50, OFFSET_Y);
    ctx.lineTo(CANVAS_WIDTH - 50, OFFSET_Y);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(OFFSET_X, 50);
    ctx.lineTo(OFFSET_X, CANVAS_HEIGHT - 50);
    ctx.stroke();
    
    // Grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    
    for (let i = -3; i <= 3; i++) {
      if (i !== 0) {
        const screenX = i * SCALE_X + OFFSET_X;
        ctx.beginPath();
        ctx.moveTo(screenX, 50);
        ctx.lineTo(screenX, CANVAS_HEIGHT - 50);
        ctx.stroke();
      }
    }
    
    for (let i = -1; i <= 4; i++) {
      if (i !== 0) {
        const screenY = OFFSET_Y - i * SCALE_Y;
        ctx.beginPath();
        ctx.moveTo(50, screenY);
        ctx.lineTo(CANVAS_WIDTH - 50, screenY);
        ctx.stroke();
      }
    }
    
    // Axis labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('x', CANVAS_WIDTH - 30, OFFSET_Y + 15);
    ctx.textAlign = 'left';
    ctx.fillText('f(x)', OFFSET_X + 10, 40);
  };

  const drawFunction = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = currentFunc.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let firstPoint = true;
    for (let screenX = 50; screenX <= CANVAS_WIDTH - 50; screenX += 2) {
      const graphX = (screenX - OFFSET_X) / SCALE_X;
      const graphY = currentFunc.f(graphX);
      const screenY = OFFSET_Y - graphY * SCALE_Y;
      
      if (screenY >= 50 && screenY <= CANVAS_HEIGHT - 50) {
        if (firstPoint) {
          ctx.moveTo(screenX, screenY);
          firstPoint = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
    }
    ctx.stroke();
  };

  const drawTangentLine = (ctx: CanvasRenderingContext2D, pointX: number) => {
    if (!showTangent) return;
    
    const pointY = currentFunc.f(pointX);
    const slope = currentFunc.df(pointX);
    
    // Draw tangent line
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    
    const leftX = -3;
    const rightX = 3;
    const leftY = pointY + slope * (leftX - pointX);
    const rightY = pointY + slope * (rightX - pointX);
    
    const leftScreen = graphToScreen(leftX, leftY);
    const rightScreen = graphToScreen(rightX, rightY);
    
    ctx.moveTo(leftScreen.x, leftScreen.y);
    ctx.lineTo(rightScreen.x, rightScreen.y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw point
    const pointScreen = graphToScreen(pointX, pointY);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(pointScreen.x, pointScreen.y, 6, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawSecantLine = (ctx: CanvasRenderingContext2D, pointX: number) => {
    if (!showSecant) return;
    
    const point1X = pointX - 1;
    const point2X = pointX + 1;
    const point1Y = currentFunc.f(point1X);
    const point2Y = currentFunc.f(point2X);
    
    // Draw secant line
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    
    const point1Screen = graphToScreen(point1X, point1Y);
    const point2Screen = graphToScreen(point2X, point2Y);
    
    // Extend the line
    const slope = (point2Y - point1Y) / (point2X - point1X);
    const leftX = -3;
    const rightX = 3;
    const leftY = point1Y + slope * (leftX - point1X);
    const rightY = point1Y + slope * (rightX - point1X);
    
    const leftScreen = graphToScreen(leftX, leftY);
    const rightScreen = graphToScreen(rightX, rightY);
    
    ctx.moveTo(leftScreen.x, leftScreen.y);
    ctx.lineTo(rightScreen.x, rightScreen.y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw secant points
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(point1Screen.x, point1Screen.y, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(point2Screen.x, point2Screen.y, 4, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawConvexityAnalysis = (ctx: CanvasRenderingContext2D, pointX: number) => {
    const secondDerivative = currentFunc.d2f(pointX);
    
    // Draw second derivative indicator
    ctx.fillStyle = '#374151';
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    
    const analysis = [];
    analysis.push(`f''(x) = ${secondDerivative.toFixed(2)}`);
    
    if (selectedFunction === 'convex') {
      analysis.push("f''(x) > 0 → Convex");
      analysis.push('Function lies above tangent');
    } else if (selectedFunction === 'concave') {
      analysis.push("f''(x) < 0 → Concave");
      analysis.push('Function lies below tangent');
    } else {
      if (secondDerivative > 0) {
        analysis.push('f\'\'\'(x) > 0 → Locally convex');
      } else if (secondDerivative < 0) {
        analysis.push('f\'\'\'(x) < 0 → Locally concave');
      } else {
        analysis.push('f\'\'\'(x) = 0 → Inflection point');
      }
    }
    
    analysis.forEach((text, index) => {
      ctx.fillText(text, 20, 20 + index * 20);
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const graphPoint = screenToGraph(x, y);
    setMousePos({ x: Math.max(-3, Math.min(3, graphPoint.x)), y: graphPoint.y });
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    drawAxes(ctx);
    drawFunction(ctx);
    drawSecantLine(ctx, mousePos.x);
    drawTangentLine(ctx, mousePos.x);
    drawConvexityAnalysis(ctx, mousePos.x);
    
  }, [selectedFunction, showTangent, showSecant, mousePos]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl lucida-bold mb-6">Interactive Convexity Analysis</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="border border-gray-300 rounded cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            />
            <div className="absolute top-2 right-2 bg-white bg-opacity-90 p-2 rounded text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Tangent Line</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Secant Line</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm lucida text-gray-600">
            Move your mouse over the graph to explore different points. The analysis updates in real-time.
          </p>
        </div>

        {/* Controls and Information */}
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="block text-sm lucida">
              Function Type:
              <select
                value={selectedFunction}
                onChange={(e) => setSelectedFunction(e.target.value as any)}
                className="mt-1 block w-full px-2 py-1 border rounded lucida text-sm"
              >
                <option value="convex">Convex</option>
                <option value="nonconvex">Non-convex</option>
                <option value="concave">Concave</option>
              </select>
            </label>

            <div className="space-y-2">
              <label className="flex items-center text-sm lucida">
                <input
                  type="checkbox"
                  checked={showTangent}
                  onChange={(e) => setShowTangent(e.target.checked)}
                  className="mr-2"
                />
                Show Tangent Line
              </label>
              
              <label className="flex items-center text-sm lucida">
                <input
                  type="checkbox"
                  checked={showSecant}
                  onChange={(e) => setShowSecant(e.target.checked)}
                  className="mr-2"
                />
                Show Secant Line
              </label>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="lucida-bold mb-2">Current Function</h4>
            <p className="text-sm lucida mb-2" style={{ color: currentFunc.color }}>
              {currentFunc.name}
            </p>
            <div className="text-xs lucida space-y-1">
              <div>Point: x = {mousePos.x.toFixed(2)}</div>
              <div>f(x) = {currentFunc.f(mousePos.x).toFixed(2)}</div>
              <div>f'(x) = {currentFunc.df(mousePos.x).toFixed(2)}</div>
              <div>f''(x) = {currentFunc.d2f(mousePos.x).toFixed(2)}</div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded">
            <h4 className="lucida-bold mb-2">Convexity Test</h4>
            <div className="text-sm lucida space-y-2">
              <div>
                <strong>Second Derivative Test:</strong>
              </div>
              <ul className="text-xs space-y-1 ml-4">
                <li>• f''(x) &gt; 0 → Convex</li>
                <li>• f''(x) &lt; 0 → Concave</li>
                <li>• f''(x) = 0 → Inflection point</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded">
            <h4 className="lucida-bold mb-2">Geometric Interpretation</h4>
            <div className="text-xs lucida space-y-2">
              <div>
                <strong>Convex function:</strong> Lies above its tangent lines. Any line segment connecting two points on the graph lies above the graph.
              </div>
              <div>
                <strong>Concave function:</strong> Lies below its tangent lines. Any line segment connecting two points on the graph lies below the graph.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}