"use client";

import { useState, useEffect, useRef } from "react";

export default function VectorNormsDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [angle, setAngle] = useState(0);
  const [showNorms, setShowNorms] = useState(true);
  const [vectorLength, setVectorLength] = useState(1.5);

  // Canvas settings
  const WIDTH = 600;
  const HEIGHT = 400;
  const ORIGIN = { x: WIDTH / 2, y: HEIGHT / 2 };
  const SCALE = 80; // Pixels per unit
  const ANGLE_SPEED = 0.015; // Slower, more elegant speed
  const FPS = 60;

  // Norm calculations
  const l0Norm = (v: [number, number]) => {
    return (v[0] !== 0 ? 1 : 0) + (v[1] !== 0 ? 1 : 0);
  };

  const l1Norm = (v: [number, number]) => {
    return Math.abs(v[0]) + Math.abs(v[1]);
  };

  const l2Norm = (v: [number, number]) => {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  };

  const lInfinityNorm = (v: [number, number]) => {
    return Math.max(Math.abs(v[0]), Math.abs(v[1]));
  };

  // Transform coordinates to screen space
  const toScreenCoords = (v: [number, number]) => {
    return {
      x: ORIGIN.x + v[0] * SCALE,
      y: ORIGIN.y - v[1] * SCALE // Flip Y axis
    };
  };

  // Draw unit ball for a given norm
  const drawUnitBall = (
    ctx: CanvasRenderingContext2D,
    normFunc: (v: [number, number]) => number,
    color: string,
    steps = 1000
  ) => {
    const points: { x: number; y: number }[] = [];
    
    for (let i = 0; i < steps; i++) {
      const theta = (2 * Math.PI * i) / steps;
      const v: [number, number] = [Math.cos(theta), Math.sin(theta)];
      
      let s: number;
      if (normFunc === l0Norm) {
        // L0 norm is discrete, approximate unit ball
        s = 1.0 / Math.max(Math.abs(v[0]), Math.abs(v[1]));
      } else {
        const norm = normFunc(v);
        s = norm !== 0 ? 1.0 / norm : 1;
      }
      
      points.push(toScreenCoords([s * v[0], s * v[1]]));
    }
    
    if (points.length > 0) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }
  };

  // Draw the visualization
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw axes with subtle styling
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT / 2);
    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();

    // Draw unit balls with refined colors
    drawUnitBall(ctx, l0Norm, "#f59e0b"); // Amber for L0
    drawUnitBall(ctx, l1Norm, "#10b981"); // Emerald for L1
    drawUnitBall(ctx, l2Norm, "#3b82f6"); // Blue for L2
    drawUnitBall(ctx, lInfinityNorm, "#ef4444"); // Red for L∞

    // Calculate current vector
    const vector: [number, number] = [
      Math.cos(angle) * vectorLength,
      Math.sin(angle) * vectorLength
    ];

    // Draw vector with smooth styling
    const vectorEnd = toScreenCoords(vector);
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(ORIGIN.x, ORIGIN.y);
    ctx.lineTo(vectorEnd.x, vectorEnd.y);
    ctx.stroke();

    // Draw vector endpoint with subtle shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 4;
    ctx.fillStyle = "#1f2937";
    ctx.beginPath();
    ctx.arc(vectorEnd.x, vectorEnd.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Display norms if enabled
    if (showNorms) {
      const norms = [
        { name: "L0 Norm", value: l0Norm(vector), color: "#f59e0b" },
        { name: "L1 Norm", value: l1Norm(vector), color: "#10b981" },
        { name: "L2 Norm", value: l2Norm(vector), color: "#3b82f6" },
        { name: "L∞ Norm", value: lInfinityNorm(vector), color: "#ef4444" }
      ];

      ctx.font = "14px lucida";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      // Draw background for norm values
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillRect(8, 8, 150, 100);

      norms.forEach((norm, i) => {
        ctx.fillStyle = norm.color;
        ctx.fillText(
          `${norm.name}: ${norm.value.toFixed(2)}`,
          12,
          12 + i * 22
        );
      });
    }

    // Draw legend with refined styling
    const legendItems = [
      { name: "L0 Norm", color: "#f59e0b" },
      { name: "L1 Norm", color: "#10b981" },
      { name: "L2 Norm", color: "#3b82f6" },
      { name: "L∞ Norm", color: "#ef4444" }
    ];

    ctx.font = "12px lucida";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    // Draw legend background
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillRect(WIDTH - 130, HEIGHT - 90, 120, 80);

    legendItems.forEach((item, i) => {
      const y = HEIGHT - 80 + i * 18;
      
      // Draw color indicator with rounded corners
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.roundRect(WIDTH - 125, y - 6, 12, 12, 2);
      ctx.fill();
      
      // Draw text
      ctx.fillStyle = "#374151";
      ctx.fillText(item.name, WIDTH - 110, y);
    });
  };

  // Animation loop
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (isPlaying) {
        setAngle(prev => prev + ANGLE_SPEED);
      }
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, angle, showNorms]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setAngle(0);
    setIsPlaying(false);
  };

  const handleStep = () => {
    setAngle(prev => prev + ANGLE_SPEED);
  };

  const toggleNorms = () => {
    setShowNorms(!showNorms);
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVectorLength(parseFloat(e.target.value));
  };

  return (
    <div className="interactive-demo">
      <h4 className="text-lg lucida-bold mb-2">Vector Norms Visualization</h4>
      <p className="lucida text-sm text-gray-600 mb-4">
        Watch how different vector norms create different unit balls. The rotating vector shows current norm values.
      </p>
      
      <div className="bg-white p-4 rounded border mb-4">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="w-full h-auto border border-gray-200 rounded"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handlePlay}
          className="px-4 py-2 bg-blue-500 text-white rounded lucida text-sm hover:bg-blue-600 transition-colors"
        >
          {isPlaying ? "pause" : "play"}
        </button>
        <button
          onClick={handleStep}
          className="px-4 py-2 bg-gray-500 text-white rounded lucida text-sm hover:bg-gray-600 transition-colors"
        >
          step
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded lucida text-sm hover:bg-red-600 transition-colors"
        >
          reset
        </button>
        <button
          onClick={toggleNorms}
          className={`px-4 py-2 rounded lucida text-sm transition-colors ${
            showNorms
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          {showNorms ? "hide" : "show"} norms
        </button>
        <div className="flex items-center gap-2">
          <label className="lucida text-sm text-gray-700">L2 Length:</label>
          <input
            type="range"
            min="0.1"
            max="3.0"
            step="0.1"
            value={vectorLength}
            onChange={handleLengthChange}
            className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="lucida text-sm text-gray-600 w-12">{vectorLength.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-600 lucida">
        <p><strong>Amber:</strong> L0 Norm (Hamming) - counts non-zero elements</p>
        <p><strong>Emerald:</strong> L1 Norm (Manhattan) - sum of absolute values</p>
        <p><strong>Blue:</strong> L2 Norm (Euclidean) - square root of sum of squares</p>
        <p><strong>Red:</strong> L∞ Norm (Chebyshev) - maximum absolute value</p>
        <p className="mt-2"><strong>Tip:</strong> Use the slider to adjust the vector's L2 norm (length)!</p>
      </div>
    </div>
  );
} 