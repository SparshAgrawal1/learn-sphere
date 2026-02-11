import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Eraser, Trash2, Undo2, Send, Pen, Circle } from 'lucide-react';

interface ScratchpadProps {
  onSubmit: (imageData: string) => void;
  isSubmitting?: boolean;
}

const Scratchpad: React.FC<ScratchpadProps> = ({ onSubmit, isSubmitting = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const colors = [
    '#000000', // Black
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#22C55E', // Green
    '#F97316', // Orange
    '#8B5CF6', // Purple
  ];

  const brushSizes = [2, 4, 6, 8];

  // Initialize canvas with white background
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill with white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial state
    saveToHistory();
  }, []);

  // Resize handler
  useEffect(() => {
    initCanvas();

    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Save current content
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0);
      }

      // Resize canvas
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Fill with white and restore content
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  // Save current state to history
  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    
    // Limit history to 20 items
    if (newHistory.length > 20) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo last action
  const handleUndo = () => {
    if (historyIndex <= 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newIndex = historyIndex - 1;
    ctx.putImageData(history[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  };

  // Clear canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  // Get canvas coordinates from event
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // Start drawing
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  // Draw
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.lineWidth = tool === 'eraser' ? brushSize * 3 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  // Stop drawing
  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  // Submit the canvas as image
  const handleSubmit = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to base64 PNG
    const dataUrl = canvas.toDataURL('image/png');
    // Remove the data URL prefix to get just the base64 data
    const base64Data = dataUrl.split(',')[1];
    
    onSubmit(base64Data);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-orange-400/90 to-orange-500/90 text-white">
        <div className="flex items-center gap-2">
          <Pen className="w-5 h-5" />
          <div>
            <h3 className="font-semibold text-sm">Scratchpad</h3>
            <p className="text-xs text-white/80">Draw or write your answer here</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Colors */}
          <div className="flex items-center gap-1">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setColor(c);
                  setTool('pen');
                }}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  color === c && tool === 'pen'
                    ? 'border-orange-500 scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: c }}
                title={c === '#000000' ? 'Black' : c}
              />
            ))}
          </div>

          {/* Brush Sizes */}
          <div className="flex items-center gap-1">
            {brushSizes.map((size) => (
              <button
                key={size}
                onClick={() => setBrushSize(size)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  brushSize === size
                    ? 'bg-orange-100 border-orange-500 border'
                    : 'bg-white border border-gray-300 hover:bg-gray-100'
                }`}
                title={`Brush size ${size}`}
              >
                <Circle 
                  className="text-gray-600" 
                  style={{ 
                    width: size + 4, 
                    height: size + 4,
                    fill: 'currentColor'
                  }} 
                />
              </button>
            ))}
          </div>

          {/* Tools */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTool('pen')}
              className={`p-1.5 rounded-lg transition-all ${
                tool === 'pen'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
              title="Pen"
            >
              <Pen className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`p-1.5 rounded-lg transition-all ${
                tool === 'eraser'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
              title="Eraser"
            >
              <Eraser className="w-4 h-4" />
            </button>
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="Undo"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleClear}
              className="p-1.5 rounded-lg bg-white border border-gray-300 text-red-500 hover:bg-red-50 transition-all"
              title="Clear All"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        ref={containerRef}
        className="flex-1 relative cursor-crosshair"
        style={{ minHeight: '300px' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Submit Button */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <motion.button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Answer
            </>
          )}
        </motion.button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Your drawing will be sent to the AI for evaluation
        </p>
      </div>
    </div>
  );
};

export default Scratchpad;
