"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  label: 1 | -1;
}

interface GaussianParams {
  mean: [number, number];
  covariance: [[number, number], [number, number]];
  prior: number;
}

export default function QDADemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([
    { x: 120, y: 100, label: 1 },
    { x: 140, y: 120, label: 1 },
    { x: 160, y: 110, label: 1 },
    { x: 180, y: 130, label: 1 },
    { x: 280, y: 180, label: -1 },
    { x: 300, y: 200, label: -1 },
    { x: 320, y: 190, label: -1 },
    { x: 340, y: 210, label: -1 },
  ]);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [qdaParams, setQdaParams] = useState<{
    class1: GaussianParams;
    class2: GaussianParams;
  } | null>(null);
  const [showDecisionBoundary, setShowDecisionBoundary] = useState(true);
  const [showConfidenceEllipses, setShowConfidenceEllipses] = useState(true);

  const canvasWidth = 500;
  const canvasHeight = 400;

  // Calculate sample mean
  const calculateMean = (points: Point[]): [number, number] => {
    const n = points.length;
    if (n === 0) return [0, 0];
    
    const sumX = points.reduce((sum, p) => sum + p.x, 0);
    const sumY = points.reduce((sum, p) => sum + p.y, 0);
    
    return [sumX / n, sumY / n];
  };

  // Calculate sample covariance matrix
  const calculateCovariance = (points: Point[], mean: [number, number]): [[number, number], [number, number]] => {
    const n = points.length;
    if (n <= 1) return [[1, 0], [0, 1]]; // Identity matrix for small samples
    
    let sumXX = 0, sumXY = 0, sumYY = 0;
    
    for (const point of points) {
      const dx = point.x - mean[0];
      const dy = point.y - mean[1];
      sumXX += dx * dx;
      sumXY += dx * dy;
      sumYY += dy * dy;
    }
    
    return [
      [sumXX / (n - 1), sumXY / (n - 1)],
      [sumXY / (n - 1), sumYY / (n - 1)]
    ];
  };

  // Calculate QDA parameters
  const calculateQDA = useCallback(() => {
    const class1Points = points.filter(p => p.label === 1);
    const class2Points = points.filter(p => p.label === -1);
    
    if (class1Points.length === 0 || class2Points.length === 0) {
      setQdaParams(null);
      return;
    }
    
    const mean1 = calculateMean(class1Points);
    const mean2 = calculateMean(class2Points);
    
    const cov1 = calculateCovariance(class1Points, mean1);
    const cov2 = calculateCovariance(class2Points, mean2);
    
    const prior1 = class1Points.length / points.length;
    const prior2 = class2Points.length / points.length;
    
    setQdaParams({
      class1: { mean: mean1, covariance: cov1, prior: prior1 },
      class2: { mean: mean2, covariance: cov2, prior: prior2 }
    });
  }, [points]);

  useEffect(() => {
    calculateQDA();
  }, [calculateQDA]);

  // Matrix operations
  const determinant2x2 = (matrix: [[number, number], [number, number]]): number => {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  };

  const inverse2x2 = (matrix: [[number, number], [number, number]]): [[number, number], [number, number]] => {
    const det = determinant2x2(matrix);
    if (Math.abs(det) < 1e-10) {
      // Handle singular matrix
      return [[1, 0], [0, 1]];
    }
    
    return [
      [matrix[1][1] / det, -matrix[0][1] / det],
      [-matrix[1][0] / det, matrix[0][0] / det]
    ];
  };

  // Multivariate normal PDF
  const multivariateNormalPDF = (x: [number, number], mean: [number, number], covariance: [[number, number], [number, number]]): number => {
    const dx = x[0] - mean[0];
    const dy = x[1] - mean[1];
    const diff = [dx, dy];
    
    const det = determinant2x2(covariance);
    if (det <= 0) return 0;
    
    const inv = inverse2x2(covariance);
    
    // Quadratic form: (x - μ)ᵀ Σ⁻¹ (x - μ)
    const quadForm = diff[0] * (inv[0][0] * diff[0] + inv[0][1] * diff[1]) + 
                     diff[1] * (inv[1][0] * diff[0] + inv[1][1] * diff[1]);
    
    const normalization = 1 / (2 * Math.PI * Math.sqrt(det));
    return normalization * Math.exp(-0.5 * quadForm);
  };

  // QDA decision function
  const qdaDecision = (x: [number, number]): number => {
    if (!qdaParams) return 0;
    
    const { class1, class2 } = qdaParams;
    
    const pdf1 = multivariateNormalPDF(x, class1.mean, class1.covariance);
    const pdf2 = multivariateNormalPDF(x, class2.mean, class2.covariance);
    
    const posterior1 = pdf1 * class1.prior;
    const posterior2 = pdf2 * class2.prior;
    
    return posterior1 - posterior2;
  };

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
    for (let i = 0; i <= canvasWidth; i += 25) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvasHeight);
      ctx.stroke();
    }
    for (let i = 0; i <= canvasHeight; i += 25) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvasWidth, i);
      ctx.stroke();
    }

    // Draw decision boundary
    if (showDecisionBoundary && qdaParams) {
      const imageData = ctx.createImageData(canvasWidth, canvasHeight);
      const data = imageData.data;
      
      for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
          const decision = qdaDecision([x, y]);
          const index = (y * canvasWidth + x) * 4;
          
          if (Math.abs(decision) < 0.01) {
            // Decision boundary
            data[index] = 0;     // R
            data[index + 1] = 0; // G
            data[index + 2] = 0; // B
            data[index + 3] = 255; // A
          } else {
            // Background coloring
            const alpha = Math.min(50, Math.abs(decision) * 1000);
            if (decision > 0) {
              data[index] = 59;      // Blue class
              data[index + 1] = 130;
              data[index + 2] = 246;
              data[index + 3] = alpha;
            } else {
              data[index] = 239;     // Red class
              data[index + 1] = 68;
              data[index + 2] = 68;
              data[index + 3] = alpha;
            }
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    }

    // Draw confidence ellipses
    if (showConfidenceEllipses && qdaParams) {
      const drawEllipse = (params: GaussianParams, color: string) => {
        const { mean, covariance } = params;
        
        // Calculate eigenvalues and eigenvectors for ellipse orientation
        const a = covariance[0][0];
        const b = covariance[0][1];
        const c = covariance[1][1];
        
        const trace = a + c;
        const det = a * c - b * b;
        
        const lambda1 = (trace + Math.sqrt(trace * trace - 4 * det)) / 2;
        const lambda2 = (trace - Math.sqrt(trace * trace - 4 * det)) / 2;
        
        const angle = Math.abs(b) < 1e-10 ? 0 : Math.atan2(lambda1 - a, b);
        
        // Draw ellipse for 95% confidence interval (chi-squared with 2 df = 5.991)
        const scale = Math.sqrt(5.991);
        const radiusX = scale * Math.sqrt(Math.abs(lambda1));
        const radiusY = scale * Math.sqrt(Math.abs(lambda2));
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        
        ctx.beginPath();
        ctx.ellipse(mean[0], mean[1], radiusX, radiusY, angle, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Draw mean point
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(mean[0], mean[1], 4, 0, 2 * Math.PI);
        ctx.fill();
      };
      
      drawEllipse(qdaParams.class1, "#3b82f6");
      drawEllipse(qdaParams.class2, "#ef4444");
    }

    // Draw data points
    points.forEach((point, index) => {
      ctx.fillStyle = point.label === 1 ? "#3b82f6" : "#ef4444";
      ctx.strokeStyle = isDragging === index ? "#000" : "#fff";
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    });

    // Draw information panel
    if (qdaParams) {
      const { class1, class2 } = qdaParams;
      
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillRect(10, 10, 180, 160);
      ctx.strokeStyle = "#ccc";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, 180, 160);
      
      ctx.fillStyle = "#000";
      ctx.font = "11px lucida";
      ctx.textAlign = "left";
      
      let y = 25;
      ctx.fillText("Class +1 (Blue):", 15, y);
      y += 15;
      ctx.fillText(`μ₁ = [${class1.mean[0].toFixed(1)}, ${class1.mean[1].toFixed(1)}]`, 15, y);
      y += 15;
      ctx.fillText(`Σ₁ = [${class1.covariance[0][0].toFixed(1)}, ${class1.covariance[0][1].toFixed(1)}]`, 15, y);
      y += 15;
      ctx.fillText(`     [${class1.covariance[1][0].toFixed(1)}, ${class1.covariance[1][1].toFixed(1)}]`, 15, y);
      y += 15;
      ctx.fillText(`π₁ = ${class1.prior.toFixed(3)}`, 15, y);
      
      y += 20;
      ctx.fillText("Class -1 (Red):", 15, y);
      y += 15;
      ctx.fillText(`μ₂ = [${class2.mean[0].toFixed(1)}, ${class2.mean[1].toFixed(1)}]`, 15, y);
      y += 15;
      ctx.fillText(`Σ₂ = [${class2.covariance[0][0].toFixed(1)}, ${class2.covariance[0][1].toFixed(1)}]`, 15, y);
      y += 15;
      ctx.fillText(`     [${class2.covariance[1][0].toFixed(1)}, ${class2.covariance[1][1].toFixed(1)}]`, 15, y);
      y += 15;
      ctx.fillText(`π₂ = ${class2.prior.toFixed(3)}`, 15, y);
    }
  }, [points, qdaParams, isDragging, showDecisionBoundary, showConfidenceEllipses]);

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
      p => Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2) < 12
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
      { x: 120, y: 100, label: 1 },
      { x: 140, y: 120, label: 1 },
      { x: 160, y: 110, label: 1 },
      { x: 180, y: 130, label: 1 },
      { x: 280, y: 180, label: -1 },
      { x: 300, y: 200, label: -1 },
      { x: 320, y: 190, label: -1 },
      { x: 340, y: 210, label: -1 },
    ]);
  };

  return (
    <div className="qda-demo">
      <h4 className="text-lg lucida-bold mb-4">Interactive Quadratic Discriminant Analysis</h4>
      
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
        <button
          onClick={() => setShowDecisionBoundary(!showDecisionBoundary)}
          className={`px-4 py-2 rounded lucida text-sm ${
            showDecisionBoundary 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          boundary
        </button>
        <button
          onClick={() => setShowConfidenceEllipses(!showConfidenceEllipses)}
          className={`px-4 py-2 rounded lucida text-sm ${
            showConfidenceEllipses 
              ? 'bg-purple-500 text-white hover:bg-purple-600' 
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          ellipses
        </button>
      </div>

      <div className="text-sm lucida text-gray-600 space-y-1">
        <p>• Click to add points (alternates between classes)</p>
        <p>• Drag points to move them and see real-time updates</p>
        <p>• Blue points: +1 class, Red points: -1 class</p>
        <p>• Decision boundary: quadratic curve separating classes</p>
        <p>• Confidence ellipses: 95% confidence regions for each class</p>
        <p>• μ: mean vector, Σ: covariance matrix, π: prior probability</p>
      </div>

      {points.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm lucida">
          <h5 className="font-bold mb-2">Current Points:</h5>
          <div className="grid grid-cols-2 gap-2">
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${point.label === 1 ? 'bg-blue-500' : 'bg-red-500'}`}></span>
                <span>({point.x.toFixed(0)}, {point.y.toFixed(0)}) - {point.label}</span>
                <button
                  onClick={() => togglePointLabel(index)}
                  className="text-xs px-1 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
                >
                  flip
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}