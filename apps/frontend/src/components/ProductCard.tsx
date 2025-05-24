import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye, Tag } from 'lucide-react';
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
      className="group relative bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {product.new && (
          <motion.span 
            className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full backdrop-blur-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            NEW
          </motion.span>
        )}
        {product.sale && discountPercentage > 0 && (
          <motion.span 
            className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full backdrop-blur-sm flex items-center gap-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Tag className="h-3 w-3" />
            -{discountPercentage}%
          </motion.span>
        )}
        {!product.inStock && (
          <span className="px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            OUT OF STOCK
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="absolute top-3 right-3 z-20 flex flex-col gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
        transition={{ duration: 0.2 }}
      >
        <motion.button
          onClick={() => onToggleWishlist?.(product)}
          className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
            isInWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-700 hover:bg-red-50 hover:text-red-500'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </motion.button>
        
        <motion.button
          onClick={() => onQuickView?.(product)}
          className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="h-4 w-4" />
        </motion.button>
      </motion.div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
          onMouseEnter={() => {
            if (product.images.length > 1) {
              setCurrentImageIndex(1);
            }
          }}
          onMouseLeave={() => setCurrentImageIndex(0)}
        />
        
        {/* Image indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black/20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAddToCart?.(product)}
            disabled={!product.inStock}
            className="px-4 py-2"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock indicator */}
        {product.inStock && product.stockCount <= 10 && (
          <p className="text-sm text-orange-600 mb-2">
            Only {product.stockCount} left in stock
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 