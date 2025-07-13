"use client";

import { useState, useEffect, useRef } from "react";

interface InteractiveDemoProps {
  type: "sequence" | "matrix" | "neural-network";
  title: string;
  description: string;
}

export default function InteractiveDemo({ type, title, description }: InteractiveDemoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw based on type
    switch (type) {
      case "sequence":
        drawSequenceDemo(ctx, currentStep);
        break;
      case "matrix":
        drawMatrixDemo(ctx, currentStep);
        break;
      case "neural-network":
        drawNeuralNetworkDemo(ctx, currentStep);
        break;
    }
  }, [type, currentStep]);

  const drawSequenceDemo = (ctx: CanvasRenderingContext2D, step: number) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Draw coordinate system
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, height / 2);
    ctx.lineTo(width - 50, height / 2);
    ctx.moveTo(width / 2, 50);
    ctx.lineTo(width / 2, height - 50);
    ctx.stroke();

    // Draw sequence points
    ctx.fillStyle = "#3b82f6";
    ctx.strokeStyle = "#1d4ed8";
    ctx.lineWidth = 2;

    for (let i = 0; i < Math.min(step + 1, 10); i++) {
      const x = 100 + i * 60;
      const y = height / 2 - 50 * Math.sin(i * 0.5) * Math.exp(-i * 0.1);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      if (i > 0) {
        const prevX = 100 + (i - 1) * 60;
        const prevY = height / 2 - 50 * Math.sin((i - 1) * 0.5) * Math.exp(-(i - 1) * 0.1);
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }

    // Draw limit line
    if (step > 5) {
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(50, height / 2);
      ctx.lineTo(width - 50, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const drawMatrixDemo = (ctx: CanvasRenderingContext2D, step: number) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Draw matrix grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    
    const gridSize = 40;
    const startX = (width - 3 * gridSize) / 2;
    const startY = (height - 3 * gridSize) / 2;
    
    for (let i = 0; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(startX + i * gridSize, startY);
      ctx.lineTo(startX + i * gridSize, startY + 3 * gridSize);
      ctx.moveTo(startX, startY + i * gridSize);
      ctx.lineTo(startX + 3 * gridSize, startY + i * gridSize);
      ctx.stroke();
    }

    // Draw matrix values with animation
    ctx.fillStyle = "#3b82f6";
    ctx.font = "16px lucida";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    const values = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const x = startX + j * gridSize + gridSize / 2;
        const y = startY + i * gridSize + gridSize / 2;
        
        if (step >= i * 3 + j) {
          ctx.fillText(values[i][j].toString(), x, y);
        }
      }
    }
  };

  const drawNeuralNetworkDemo = (ctx: CanvasRenderingContext2D, step: number) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Draw nodes
    const layers = [3, 4, 3, 1];
    const layerSpacing = width / (layers.length + 1);
    
    ctx.fillStyle = "#3b82f6";
    ctx.strokeStyle = "#1d4ed8";
    ctx.lineWidth = 1;
    
    layers.forEach((nodeCount, layerIndex) => {
      const x = layerSpacing * (layerIndex + 1);
      const nodeSpacing = height / (nodeCount + 1);
      
      for (let i = 0; i < nodeCount; i++) {
        const y = nodeSpacing * (i + 1);
        
        if (step >= layerIndex * 2) {
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        }
        
        // Draw connections to next layer
        if (layerIndex < layers.length - 1 && step >= layerIndex * 2 + 1) {
          const nextLayerSpacing = height / (layers[layerIndex + 1] + 1);
          for (let j = 0; j < layers[layerIndex + 1]; j++) {
            const nextY = nextLayerSpacing * (j + 1);
            ctx.beginPath();
            ctx.moveTo(x + 15, y);
            ctx.lineTo(x + layerSpacing - 15, nextY);
            ctx.stroke();
          }
        }
      }
    });
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 20));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= 20) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="interactive-demo">
      <h4 className="text-lg lucida-bold mb-2">{title}</h4>
      <p className="lucida text-sm text-gray-600 mb-4">{description}</p>
      
      <div className="bg-white p-4 rounded border mb-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="w-full h-auto border border-gray-200 rounded"
        />
      </div>
      
      <div className="flex gap-2">
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
      </div>
      
      <div className="mt-2 text-xs text-gray-500 lucida">
        step: {currentStep}/20
      </div>
    </div>
  );
} 