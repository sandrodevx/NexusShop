import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { 
  RotateCcw, 
  Maximize2, 
  Download, 
  Sun,
  Moon,
  Zap
} from 'lucide-react';

// Types
interface Product3DViewerProps {
  // modelUrl: string; // Commented out since not implemented yet
  productName: string;
  className?: string;
  autoRotate?: boolean;
  enableVariants?: boolean;
  variants?: {
    id: string;
    name: string;
    color: string;
  }[];
  onVariantChange?: (variantId: string) => void;
}

// Simplified 3D placeholder component
function PlaceholderViewer({ productName }: { productName: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, #06b6d4 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Main 3D placeholder */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 3D cube representation */}
        <motion.div
          className="w-32 h-32 mx-auto mb-6 relative"
          animate={{ rotateY: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ perspective: "1000px" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
            <div className="absolute inset-4 bg-gradient-to-tl from-white/20 to-white/40 rounded-xl backdrop-blur-sm"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/30 rounded-full backdrop-blur-sm"></div>
          </div>
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{productName}</h3>
        <p className="text-gray-600 mb-4">3D Model Viewer</p>
        <p className="text-sm text-gray-500">Interactive 3D visualization coming soon</p>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Environment selector
function EnvironmentSelector({ 
  currentEnv, 
  onEnvChange 
}: { 
  currentEnv: string; 
  onEnvChange: (env: string) => void;
}) {
  const environments = [
    { id: 'sunset', name: 'Sunset' },
    { id: 'dawn', name: 'Dawn' },
    { id: 'night', name: 'Night' },
    { id: 'studio', name: 'Studio' },
  ];

  return (
    <motion.div
      className="absolute top-4 left-4 z-10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200 p-2">
        <div className="grid grid-cols-2 gap-1">
          {environments.map((env) => (
            <Button
              key={env.id}
              variant={currentEnv === env.id ? "primary" : "ghost"}
              size="sm"
              onClick={() => onEnvChange(env.id)}
              className="text-xs"
            >
              {env.name}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Variant selector
function VariantSelector({ 
  variants, 
  currentVariant, 
  onVariantChange 
}: { 
  variants: {
    id: string;
    name: string;
    color: string;
  }[];
  currentVariant?: {
    id: string;
    name: string;
    color: string;
  };
  onVariantChange: (variantId: string) => void;
}) {
  return (
    <motion.div
      className="absolute bottom-4 left-4 z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-medium mb-3">Color Variants</h3>
        <div className="flex space-x-2">
          {variants.map((variant) => (
            <motion.button
              key={variant.id}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                currentVariant?.id === variant.id 
                  ? 'border-blue-500 shadow-lg scale-110' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              style={{ backgroundColor: variant.color }}
              onClick={() => onVariantChange(variant.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={variant.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Controls panel
function ControlsPanel({ 
  autoRotate, 
  onAutoRotateToggle,
  onReset,
  onFullscreen,
  onCapture,
  lighting,
  onLightingChange
}: {
  autoRotate: boolean;
  onAutoRotateToggle: () => void;
  onReset: () => void;
  onFullscreen: () => void;
  onCapture: () => void;
  lighting: 'day' | 'night';
  onLightingChange: (lighting: 'day' | 'night') => void;
}) {
  return (
    <motion.div
      className="absolute bottom-4 right-4 z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-200 p-2">
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onAutoRotateToggle}
            className={`p-2 ${autoRotate ? 'text-blue-600' : 'text-gray-600'}`}
            title="Toggle Auto Rotate"
          >
            <Zap className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLightingChange(lighting === 'day' ? 'night' : 'day')}
            title="Toggle Lighting"
            className="p-2 text-gray-600"
          >
            {lighting === 'day' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            title="Reset View"
            className="p-2 text-gray-600"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onCapture}
            title="Capture Screenshot"
            className="p-2 text-gray-600"
          >
            <Download className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onFullscreen}
            title="Fullscreen"
            className="p-2 text-gray-600"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Main component
export function Product3DViewer({
  // modelUrl, // Commented out for now
  productName,
  className = "",
  autoRotate = true,
  enableVariants = false,
  variants = [
    { id: '1', name: 'Silver', color: '#E5E7EB' },
    { id: '2', name: 'Gold', color: '#F59E0B' },
    { id: '3', name: 'Rose Gold', color: '#EC4899' },
  ],
  onVariantChange,
}: Product3DViewerProps) {
  const [isAutoRotate, setIsAutoRotate] = useState(autoRotate);
  const [currentVariant, setCurrentVariant] = useState<{
    id: string;
    name: string;
    color: string;
  } | undefined>(
    variants.length > 0 ? variants[0] : undefined
  );
  const [environment, setEnvironment] = useState('sunset');
  const [lighting, setLighting] = useState<'day' | 'night'>('day');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleVariantChange = (variantId: string) => {
    setCurrentVariant(variants.find(v => v.id === variantId));
    onVariantChange?.(variantId);
  };

  const handleReset = () => {
    console.log('Reset view');
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleCapture = () => {
    console.log('Capture screenshot');
  };

  return (
    <div className={`relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden ${className}`}>
      <PlaceholderViewer productName={productName} />

      <EnvironmentSelector
        currentEnv={environment}
        onEnvChange={setEnvironment}
      />

      {enableVariants && variants.length > 0 && (
        <VariantSelector
          variants={variants}
          currentVariant={currentVariant}
          onVariantChange={handleVariantChange}
        />
      )}

      <ControlsPanel
        autoRotate={isAutoRotate}
        onAutoRotateToggle={() => setIsAutoRotate(!isAutoRotate)}
        onReset={handleReset}
        onFullscreen={handleFullscreen}
        onCapture={handleCapture}
        lighting={lighting}
        onLightingChange={setLighting}
      />

      {/* Fullscreen indicator */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="absolute top-4 right-4 z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Press ESC to exit fullscreen
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 