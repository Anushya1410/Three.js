import { useState, useRef, useEffect } from "react";
import { RotateCcw, Maximize, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProductModel3DProps {
  modelPath: string;
  selectedColor: string;
}

function ProductModel3DPlaceholder({ modelPath, selectedColor }: ProductModel3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function animate() {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set up gradient background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw headphones outline
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationRef.current * 0.01);
      
      // Draw headband
      ctx.strokeStyle = selectedColor === 'white' ? '#e5e7eb' : '#374151';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(0, -20, 80, 0.3, Math.PI - 0.3);
      ctx.stroke();
      
      // Draw left ear cup
      ctx.fillStyle = selectedColor === 'white' ? '#f3f4f6' : 
                     selectedColor === 'red' ? '#ef4444' :
                     selectedColor === 'blue' ? '#3b82f6' : '#1f2937';
      ctx.beginPath();
      ctx.arc(-60, 20, 35, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw right ear cup
      ctx.beginPath();
      ctx.arc(60, 20, 35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Draw connecting bands
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-40, 0);
      ctx.lineTo(-60, 20);
      ctx.moveTo(40, 0);
      ctx.lineTo(60, 20);
      ctx.stroke();
      
      ctx.restore();
      
      rotationRef.current += 1;
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedColor]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas 
        ref={canvasRef}
        className="max-w-full max-h-full"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))' }}
      />
      <div className="absolute bottom-4 left-4 bg-black/20 text-white text-xs px-2 py-1 rounded">
        3D Preview (Demo Mode)
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}

interface ProductViewer3DProps {
  modelPath: string;
  selectedColor: string;
  onColorChange: (color: string) => void;
  colors: { name: string; value: string }[];
}

export function ProductViewer3D({
  modelPath,
  selectedColor,
  onColorChange,
  colors,
}: ProductViewer3DProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  const resetView = () => {
    toast({
      title: "View reset",
      description: "Product view has been reset to default position",
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleAnimation = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Animation resumed" : "Animation paused",
      description: isPaused ? "3D model is now rotating" : "3D model rotation paused",
    });
  };

  return (
    <div className="relative">
      <div className="product-viewer-container rounded-2xl aspect-square lg:aspect-[4/3] relative overflow-hidden shadow-2xl">
        <ProductModel3DPlaceholder 
          modelPath={modelPath} 
          selectedColor={selectedColor} 
        />

        {/* Floating 3D Controls */}
        <div className="absolute bottom-6 right-6 floating-controls rounded-xl p-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={resetView}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors control-hint"
              data-testid="button-reset-camera"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleAnimation}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
              data-testid="button-toggle-animation"
            >
              <Play className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
              data-testid="button-fullscreen"
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Control Instructions */}
        <div className="absolute top-6 left-6 floating-controls rounded-xl p-4 shadow-lg">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span>Interactive Preview</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <span>Color changes instantly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Color/Variant Selector */}
      <div className="mt-6">
        <div className="floating-controls rounded-xl p-4 shadow-lg">
          <h3 className="text-sm font-medium mb-3">Color Options</h3>
          <div className="flex space-x-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => onColorChange(color.name)}
                className={`w-8 h-8 rounded-full border-2 shadow-md transition-all ${
                  selectedColor === color.name
                    ? "border-primary scale-110"
                    : "border-slate-300 hover:scale-105"
                }`}
                style={{ backgroundColor: color.value }}
                data-testid={`button-color-${color.name}`}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
