"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  label: 1 | -1;
}

export default function SVDDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([
    { x: 100, y: 100, label: 1 },
    { x: 150, y: 120, label: 1 },
    { x: 200, y: 80, label: -1 },
    { x: 250, y: 150, label: -1 },
  ]);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [svmParams, setSvmParams] = useState({ w: [1, -0.5], b: 0 });

  const canvasWidth = 400;
  const canvasHeight = 300;

  // Calculate SVM parameters using simple linear separation
  const calculateSVM = useCallback(() => {
    if (points.length < 2) return;

    const positives = points.filter(p => p.label === 1);
    const negatives = points.filter(p => p.label === -1);

    if (positives.length === 0 || negatives.length === 0) return;

    // Calculate class centers
    const posCenter = {
      x: positives.reduce((sum, p) => sum + p.x, 0) / positives.length,
      y: positives.reduce((sum, p) => sum + p.y, 0) / positives.length,
    };
    const negCenter = {
      x: negatives.reduce((sum, p) => sum + p.x, 0) / negatives.length,
      y: negatives.reduce((sum, p) => sum + p.y, 0) / negatives.length,
    };

    // Vector from negative center to positive center
    const dx = posCenter.x - negCenter.x;
    const dy = posCenter.y - negCenter.y;
    const norm = Math.sqrt(dx * dx + dy * dy);

    if (norm === 0) return;

    // Weight vector points from negative to positive class
    // This ensures w·x + b > 0 for positive class
    const w = [dx / norm, dy / norm];
    
    // Decision boundary passes through midpoint between class centers
    const midpoint = {
      x: (posCenter.x + negCenter.x) / 2,
      y: (posCenter.y + negCenter.y) / 2,
    };
    
    // Calculate bias: w·midpoint + b = 0, so b = -w·midpoint
    const b = -(w[0] * midpoint.x + w[1] * midpoint.y);

    setSvmParams({ w, b });
  }, [points]);

  useEffect(() => {
    calculateSVM();
  }, [calculateSVM]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw grid
    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvasWidth; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvasHeight);
      ctx.stroke();
    }
    for (let i = 0; i <= canvasHeight; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvasWidth, i);
      ctx.stroke();
    }

    // Draw decision boundary and margins
    const { w, b } = svmParams;
    if (w[0] !== 0 || w[1] !== 0) {
      // Decision boundary: w[0]*x + w[1]*y + b = 0
      // The hyperplane is perpendicular to w vector
      
      const drawLine = (offset = 0) => {
        // For line w[0]*x + w[1]*y + (b + offset) = 0
        // Find two points on the line within canvas bounds
        const points = [];
        
        // Check intersections with canvas edges
        // Left edge (x = 0)
        if (Math.abs(w[1]) > 1e-10) {
          const y = -(b + offset) / w[1];
          if (y >= 0 && y <= canvasHeight) points.push([0, y]);
        }
        
        // Right edge (x = canvasWidth)
        if (Math.abs(w[1]) > 1e-10) {
          const y = -(w[0] * canvasWidth + b + offset) / w[1];
          if (y >= 0 && y <= canvasHeight) points.push([canvasWidth, y]);
        }
        
        // Top edge (y = 0)
        if (Math.abs(w[0]) > 1e-10) {
          const x = -(b + offset) / w[0];
          if (x >= 0 && x <= canvasWidth) points.push([x, 0]);
        }
        
        // Bottom edge (y = canvasHeight)
        if (Math.abs(w[0]) > 1e-10) {
          const x = -(w[1] * canvasHeight + b + offset) / w[0];
          if (x >= 0 && x <= canvasWidth) points.push([x, canvasHeight]);
        }
        
        // Draw line if we have at least 2 points
        if (points.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(points[0][0], points[0][1]);
          ctx.lineTo(points[1][0], points[1][1]);
          ctx.stroke();
        }
      };
      
      // Draw decision boundary (solid black line)
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      drawLine(0);
      
      // Calculate margin distance
      const wNorm = Math.sqrt(w[0] * w[0] + w[1] * w[1]);
      const marginDistance = 1; // Hard margin constraint: |w·x + b| >= 1
      
      // Draw margin boundaries (dashed lines)
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);
      
      // Positive margin: w·x + b = +1
      drawLine(marginDistance);
      
      // Negative margin: w·x + b = -1  
      drawLine(-marginDistance);
      
      ctx.setLineDash([]);
      
      // Draw weight vector from center
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const scale = 50; // Scale for visualization
      
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + w[0] * scale, centerY + w[1] * scale);
      ctx.stroke();
      
      // Arrow head for weight vector
      const angle = Math.atan2(w[1], w[0]);
      const arrowLength = 10;
      ctx.beginPath();
      ctx.moveTo(centerX + w[0] * scale, centerY + w[1] * scale);
      ctx.lineTo(
        centerX + w[0] * scale - arrowLength * Math.cos(angle - Math.PI / 6),
        centerY + w[1] * scale - arrowLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(centerX + w[0] * scale, centerY + w[1] * scale);
      ctx.lineTo(
        centerX + w[0] * scale - arrowLength * Math.cos(angle + Math.PI / 6),
        centerY + w[1] * scale - arrowLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    }

    // Draw points
    points.forEach((point, index) => {
      ctx.fillStyle = point.label === 1 ? "#3b82f6" : "#ef4444";
      ctx.strokeStyle = isDragging === index ? "#000" : "#fff";
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      
      // Draw label
      ctx.fillStyle = "#000";
      ctx.font = "12px lucida";
      ctx.textAlign = "center";
      ctx.fillText(point.label.toString(), point.x, point.y - 15);
    });

    // Draw information
    if (w[0] !== 0 || w[1] !== 0) {
      const wNorm = Math.sqrt(w[0] * w[0] + w[1] * w[1]);
      const marginWidth = 2 / wNorm;
      
      ctx.fillStyle = "#000";
      ctx.font = "12px lucida";
      ctx.textAlign = "left";
      ctx.fillText(`w = [${w[0].toFixed(2)}, ${w[1].toFixed(2)}]`, 10, 20);
      ctx.fillText(`b = ${b.toFixed(2)}`, 10, 35);
      ctx.fillText(`||w|| = ${wNorm.toFixed(2)}`, 10, 50);
      ctx.fillText(`Margin Width = ${marginWidth.toFixed(2)}`, 10, 65);
      
      // Legend
      ctx.fillStyle = "#000";
      ctx.fillText("■ Decision Boundary", 10, canvasHeight - 60);
      ctx.fillStyle = "#ef4444";
      ctx.fillText("- - Margin Boundaries", 10, canvasHeight - 45);
      ctx.fillStyle = "#10b981";
      ctx.fillText("→ Weight Vector w", 10, canvasHeight - 30);
      ctx.fillStyle = "#3b82f6";
      ctx.fillText("● Class +1", 10, canvasHeight - 15);
      ctx.fillStyle = "#ef4444";
      ctx.fillText("● Class -1", 80, canvasHeight - 15);
    }
  }, [points, svmParams, isDragging]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on existing point
    const pointIndex = points.findIndex(
      p => Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2) < 15
    );

    if (pointIndex !== -1) {
      setIsDragging(pointIndex);
    } else {
      // Add new point (alternate between classes)
      const newLabel = points.length % 2 === 0 ? 1 : -1;
      setPoints([...points, { x, y, label: newLabel as 1 | -1 }]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging === null) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(canvasWidth, e.clientX - rect.left));
    const y = Math.max(0, Math.min(canvasHeight, e.clientY - rect.top));

    setPoints(prev => prev.map((p, i) => 
      i === isDragging ? { ...p, x, y } : p
    ));
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const togglePointLabel = (index: number) => {
    setPoints(prev => prev.map((p, i) => 
      i === index ? { ...p, label: p.label === 1 ? -1 : 1 } : p
    ));
  };

  const clearPoints = () => {
    setPoints([]);
  };

  const resetPoints = () => {
    setPoints([
      { x: 100, y: 100, label: 1 },
      { x: 150, y: 120, label: 1 },
      { x: 200, y: 80, label: -1 },
      { x: 250, y: 150, label: -1 },
    ]);
  };

  return (
    <div className="svd-demo">
      <h4 className="text-lg lucida-bold mb-4">Interactive Hard Margin SVM</h4>
      
      <div className="bg-white p-4 rounded border mb-4">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border border-gray-300 cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={resetPoints}
          className="px-4 py-2 bg-blue-500 text-white rounded lucida text-sm hover:bg-blue-600"
        >
          reset
        </button>
        <button
          onClick={clearPoints}
          className="px-4 py-2 bg-red-500 text-white rounded lucida text-sm hover:bg-red-600"
        >
          clear
        </button>
      </div>

      <div className="text-sm lucida text-gray-600 space-y-1">
        <p>• Click to add points (alternates between classes)</p>
        <p>• Drag points to move them</p>
        <p>• Double-click points to toggle class</p>
        <p>• Blue points: +1 class, Red points: -1 class</p>
        <p>• Solid line: decision boundary</p>
        <p>• Dashed lines: margin boundaries</p>
      </div>

      {points.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm lucida">
          <h5 className="font-bold mb-2">Current Points:</h5>
          {points.map((point, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <span className={`w-3 h-3 rounded-full ${point.label === 1 ? 'bg-blue-500' : 'bg-red-500'}`}></span>
              <span>({point.x.toFixed(0)}, {point.y.toFixed(0)}) - Class {point.label}</span>
              <button
                onClick={() => togglePointLabel(index)}
                className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                toggle
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}