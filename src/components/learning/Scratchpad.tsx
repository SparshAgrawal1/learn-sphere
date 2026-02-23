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
  const [color, setColor] = useState('#FFFFFF');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Colors that work on dark background
  const colors = [
    '#FFFFFF', // White
    '#FF6B35', // Orange (brand)
    '#F9C326', // Yellow (brand)
    '#0D9B96', // Teal (brand)
    '#EF4444', // Red
    '#A78BFA', // Soft violet
  ];

  const brushSizes = [2, 4, 6, 8];

  const CANVAS_BG = '#1A1712';

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) tempCtx.drawImage(canvas, 0, 0);
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.fillStyle = CANVAS_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    if (newHistory.length > 20) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

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

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

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

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? CANVAS_BG : color;
    ctx.lineWidth = tool === 'eraser' ? brushSize * 3 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) { setIsDrawing(false); saveToHistory(); }
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSubmit(dataUrl.split(',')[1]);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-xl"
      style={{ background: '#131108', border: '1px solid rgba(255,107,53,0.12)' }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,107,53,0.1)', background: 'rgba(255,107,53,0.06)' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #E0521A)' }}>
          <Pen className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Scratchpad</h3>
          <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Draw or write your answer here</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex-shrink-0 px-3 py-2.5 border-b flex items-center justify-between gap-2 flex-wrap"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
        {/* Color swatches */}
        <div className="flex items-center gap-1.5">
          {colors.map((c) => (
            <button key={c} onClick={() => { setColor(c); setTool('pen'); }}
              className="w-5 h-5 rounded-full transition-all duration-150 flex-shrink-0"
              style={{
                backgroundColor: c,
                border: color === c && tool === 'pen'
                  ? '2px solid #FF6B35'
                  : '2px solid rgba(255,255,255,0.12)',
                transform: color === c && tool === 'pen' ? 'scale(1.2)' : 'scale(1)',
                boxShadow: color === c && tool === 'pen' ? `0 0 8px ${c}70` : 'none',
              }}
              title={c}
            />
          ))}
        </div>

        {/* Brush sizes */}
        <div className="flex items-center gap-1">
          {brushSizes.map((size) => (
            <button key={size} onClick={() => setBrushSize(size)}
              className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
              style={{
                background: brushSize === size ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.04)',
                border: brushSize === size ? '1px solid rgba(255,107,53,0.35)' : '1px solid rgba(255,255,255,0.07)',
              }}
              title={`Size ${size}`}>
              <Circle style={{ width: size + 3, height: size + 3, fill: brushSize === size ? '#FF8C5A' : 'rgba(255,255,255,0.3)' }} />
            </button>
          ))}
        </div>

        {/* Tool buttons */}
        <div className="flex items-center gap-1">
          <button onClick={() => setTool('pen')}
            className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
            style={{
              background: tool === 'pen' ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.04)',
              border: tool === 'pen' ? '1px solid rgba(255,107,53,0.35)' : '1px solid rgba(255,255,255,0.07)',
              color: tool === 'pen' ? '#FF8C5A' : 'rgba(255,255,255,0.3)',
            }}
            title="Pen">
            <Pen className="w-3 h-3" />
          </button>
          <button onClick={() => setTool('eraser')}
            className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
            style={{
              background: tool === 'eraser' ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.04)',
              border: tool === 'eraser' ? '1px solid rgba(255,107,53,0.35)' : '1px solid rgba(255,255,255,0.07)',
              color: tool === 'eraser' ? '#FF8C5A' : 'rgba(255,255,255,0.3)',
            }}
            title="Eraser">
            <Eraser className="w-3 h-3" />
          </button>
          <button onClick={handleUndo} disabled={historyIndex <= 0}
            className="w-6 h-6 rounded-md flex items-center justify-center transition-all disabled:opacity-30"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.3)',
            }}
            title="Undo">
            <Undo2 className="w-3 h-3" />
          </button>
          <button onClick={handleClear}
            className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.15)',
              color: 'rgba(239,68,68,0.6)',
            }}
            title="Clear">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div ref={containerRef} className="flex-1 relative" style={{ cursor: tool === 'eraser' ? 'cell' : 'crosshair', minHeight: '200px' }}>
        {/* Subtle dot grid overlay (decorative, non-blocking) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
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

      {/* Submit */}
      <div className="flex-shrink-0 px-4 py-3 border-t"
        style={{ borderColor: 'rgba(255,107,53,0.1)', background: 'rgba(255,107,53,0.04)' }}>
        <motion.button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #E0521A)', boxShadow: '0 4px 16px rgba(255,107,53,0.25)' }}
          whileHover={{ scale: isSubmitting ? 1 : 1.01, boxShadow: isSubmitting ? undefined : '0 6px 22px rgba(255,107,53,0.38)' }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              Submit Answer
            </>
          )}
        </motion.button>
        <p className="text-[10px] text-center mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Your drawing will be sent to the AI for evaluation
        </p>
      </div>
    </div>
  );
};

export default Scratchpad;
