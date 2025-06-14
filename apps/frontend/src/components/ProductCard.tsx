import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye, Tag, Zap } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../data/products';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isInWishlist?: boolean;
}

export function ProductCard({ 
  product, 
  onQuickView, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist = false 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="group relative cyber-card rounded-2xl overflow-hidden shadow-2xl hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-neon-400 via-electric-400 to-plasma-400"
        animate={isHovered ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% 200%' }}
      >
        <div className="w-full h-full bg-gradient-to-br from-cyber-800 to-dark-100 rounded-2xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-1">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.new && (
            <motion.span 
              className="px-3 py-1 bg-gradient-to-r from-neon-500 to-neon-400 text-dark-900 text-xs font-bold rounded-full backdrop-blur-sm border border-neon-400/30"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              NEW
            </motion.span>
          )}
          {product.sale && discountPercentage > 0 && (
            <motion.span 
              className="px-3 py-1 bg-gradient-to-r from-plasma-500 to-plasma-400 text-white text-xs font-bold rounded-full backdrop-blur-sm flex items-center gap-1 border border-plasma-400/30"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              <Tag className="h-3 w-3" />
              -{discountPercentage}%
            </motion.span>
          )}
          {!product.inStock && (
            <span className="px-3 py-1 bg-gradient-to-r from-cyber-600 to-cyber-500 text-cyber-200 text-xs font-bold rounded-full backdrop-blur-sm border border-cyber-400/30">
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="absolute top-4 right-4 z-20 flex flex-col gap-3"
          initial={{ opacity: 0, x: 30, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            x: isHovered ? 0 : 30,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3, staggerChildren: 0.1 }}
        >
          <motion.button
            onClick={() => onToggleWishlist?.(product)}
            className={`p-3 rounded-xl backdrop-blur-md transition-all duration-300 border ${
              isInWishlist 
                ? 'bg-gradient-to-r from-plasma-500 to-plasma-400 text-white border-plasma-400/50 neon-glow-pink' 
                : 'glass-dark text-cyber-300 hover:text-plasma-400 border-cyber-400/30 hover:border-plasma-400/50'
            }`}
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </motion.button>
          
          <motion.button
            onClick={() => onQuickView?.(product)}
            className="p-3 rounded-xl glass-dark backdrop-blur-md text-cyber-300 hover:text-neon-400 transition-all duration-300 border border-cyber-400/30 hover:border-neon-400/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Eye className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl m-1">
          <motion.img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onMouseEnter={() => {
              if (product.images.length > 1) {
                setCurrentImageIndex(1);
              }
            }}
            onMouseLeave={() => setCurrentImageIndex(0)}
          />
          
          {/* Holographic Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-neon-400/0 via-neon-400/5 to-electric-400/10 opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Image indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-neon-400 shadow-lg shadow-neon-400/50' 
                      : 'bg-cyber-400/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          )}

          {/* Quick Add Button Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-dark-100/80 via-transparent to-transparent flex items-end justify-center pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="neon"
              size="sm"
              onClick={() => onAddToCart?.(product)}
              disabled={!product.inStock}
              className="px-6 py-2 text-sm font-bold"
              glow
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Quick Add
            </Button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Brand */}
          <motion.p 
            className="text-sm text-electric-400 mb-2 font-medium font-display"
            whileHover={{ scale: 1.05 }}
          >
            {product.brand}
          </motion.p>

          {/* Name */}
          <motion.h3 
            className="font-bold text-cyber-100 mb-3 line-clamp-2 group-hover:text-neon-300 transition-colors duration-300 text-lg font-heading"
            whileHover={{ scale: 1.02 }}
          >
            {product.name}
          </motion.h3>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Star
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-electric-400 fill-current'
                        : 'text-cyber-500'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-cyber-300 font-medium">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <motion.span 
              className="text-2xl font-bold gradient-text font-display"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              ${product.price}
            </motion.span>
            {product.originalPrice && (
              <span className="text-base text-cyber-500 line-through font-medium">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Stock indicator */}
          {product.inStock && product.stockCount <= 10 && (
            <motion.p 
              className="text-sm text-electric-400 mb-3 font-medium flex items-center gap-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-4 w-4" />
              Only {product.stockCount} left in stock
            </motion.p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.slice(0, 3).map((tag) => (
              <motion.span
                key={tag}
                className="px-3 py-1 glass-dark text-cyber-300 text-xs rounded-lg border border-cyber-400/20 font-medium"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  borderColor: 'rgba(34, 197, 94, 0.3)',
                  color: '#4ade80'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={isHovered ? {
          boxShadow: [
            '0 0 20px rgba(34, 197, 94, 0.3)',
            '0 0 40px rgba(34, 197, 94, 0.4)',
            '0 0 20px rgba(34, 197, 94, 0.3)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
} 